/*
 * Compare mhiex extractors against the hi2txt-xml test corpus (GPLv2, kept outside this repo).
 *
 * The corpus is hi2txt-xml's src/test: input/<version>/{hi/<rom>.hi, nvram/<rom>/..., hiscore.dat}
 * and oracle/<version>/<rom>.xml (what hi2txt decodes from that input).
 *
 * Usage (run `npm run build` first, this reads ./dist like the tests):
 *   npm run compare -- <hi2txt-xml>/src/test [--hiscoredat <current hiscore.dat>] [--rom <rom>] [--json <file>]
 *
 * --hiscoredat flags inputs whose size does not match the current hiscore.dat entry: an extractor
 * written for today's layout cannot be expected to decode them.
 * --rom prints the side by side detail of one rom.
 */
const fs = require('fs')
const os = require('os')
const path = require('path')
const { MameHiExtractor } = require('./dist')
const extractorClasses = require('./dist/Extractor').default

function parseArgs(argv) {
    const args = { corpus: null, hiscoredat: null, rom: null, json: null }
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i]
        if (a === '--hiscoredat') args.hiscoredat = argv[++i]
        else if (a === '--rom') args.rom = argv[++i]
        else if (a === '--json') args.json = argv[++i]
        else args.corpus = a
    }
    return args
}

// rom -> total size of its @ entries
function parseHiscoreDat(file) {
    const sizes = {}
    let names = []
    let inEntries = false
    for (let line of fs.readFileSync(file, 'latin1').split(/\r?\n/)) {
        line = line.trim()
        if (!line || line.startsWith(';')) continue
        if (line.startsWith('@')) {
            inEntries = true
            const parts = line.split(',')
            if (parts.length > 3) {
                for (const n of names) sizes[n] = (sizes[n] || 0) + parseInt(parts[3], 16)
            }
        } else if (line.endsWith(':')) {
            if (inEntries) { names = []; inEntries = false }
            names.push(line.slice(0, -1))
        }
    }
    return sizes
}

function decodeEntities(s) {
    return s
        .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
}

// [{id, rows: [{RANK, SCORE, NAME, ...}]}]
function parseOracle(file) {
    const xml = fs.readFileSync(file, 'utf8')
    const tables = []
    for (const [, attrs, body] of xml.matchAll(/<table([^>]*)>([\s\S]*?)<\/table>/g)) {
        const id = (attrs.match(/id="([^"]*)"/) || [])[1] || null
        const cols = [...body.matchAll(/<col>([\s\S]*?)<\/col>/g)].map(m => m[1])
        const rows = [...body.matchAll(/<row>([\s\S]*?)<\/row>/g)].map(([, r]) => {
            const cells = [...r.matchAll(/<cell>([\s\S]*?)<\/cell>|<cell\/>/g)].map(m => decodeEntities(m[1] || ''))
            return Object.fromEntries(cols.map((c, i) => [c, cells[i] ?? '']))
        })
        tables.push({ id, rows })
    }
    return tables
}

// Roms where mhiex was checked against the game's own screen and hi2txt's decoding is the one
// that differs: reported apart, so they do not hide new regressions.
const CHECKED_ON_SCREEN = {
    airattck: 'the game shows "TODAY\'S BEST 8", hi2txt reads 5 (demo-hiscores/screenshots/airattck.jpg)',
    darius: 'the game shows "BEST 50 PLAYERS", hi2txt decodes all 102 slots (demo-hiscores/screenshots/darius.part*.jpg)',
    hyperspt: 'hi2txt drops half the score digits and mixes the medalist table in (demo-hiscores/screenshots/hyperspt.part*.png)',
}

const normScore = s => String(s ?? '').replace(/[\s,.]/g, '').replace(/^0+(?=\d)/, '')
const normName = s => String(s ?? '').trim().replace(/\s+/g, ' ')

const isEmptyScore = s => /^0*$/.test(normScore(s))

// Trailing rows scoring 0 are never-filled slots: hi2txt often hides them (line-ignore), mhiex keeps them
function trimEmptyRows(rows, score) {
    let end = rows.length
    while (end > 0 && isEmptyScore(score(rows[end - 1]))) end--
    return rows.slice(0, end)
}

// How well one mhiex table matches one oracle table
function compareTable(mine, oracle) {
    mine = trimEmptyRows(mine, r => r.score)
    oracle = { ...oracle, rows: trimEmptyRows(oracle.rows, r => r.SCORE) }
    const hasName = oracle.rows.length > 0 && 'NAME' in oracle.rows[0]
    const n = Math.min(mine.length, oracle.rows.length)
    let scores = 0, names = 0
    for (let i = 0; i < n; i++) {
        if (normScore(mine[i].score) === normScore(oracle.rows[i].SCORE)) scores++
        if (!hasName || normName(mine[i].name) === normName(oracle.rows[i].NAME)) names++
    }
    const sameLength = mine.length === oracle.rows.length
    let status
    if (mine.length === 0) status = 'DIFF'
    else if (sameLength && scores === n && names === n) status = 'OK'
    else if (scores === n && names === n) status = 'LENGTH'
    else if (scores === n) status = 'NAMES'
    else status = 'DIFF'
    return { status, scores, names, n, mineLength: mine.length, oracleLength: oracle.rows.length, hasName }
}

const rank = { OK: 0, LENGTH: 1, NAMES: 2, DIFF: 3 }

function bestMatch(mine, oracleTables) {
    let best = null
    oracleTables.forEach((t, index) => {
        const c = { ...compareTable(mine, t), index, id: t.id }
        if (!best || rank[c.status] < rank[best.status]
            || (rank[c.status] === rank[best.status] && c.scores + c.names > best.scores + best.names)) {
            best = c
        }
    })
    return best
}

// Files an extractor reads, as set by its @Extractor decorator
function expectedFiles(rom) {
    const extractor = new extractorClasses[rom]()
    return { hi: extractor.hasHi, nvram: extractor.nvramName || null }
}

// Lay the corpus input out the way MAME (and mhiex) expects: <dir>/hiscore/<rom>.hi, <dir>/nvram/<rom>/<file>.
// Returns what is missing when the corpus has no input in the form the extractor reads.
function stage(tmp, versionDir, rom) {
    const expected = expectedFiles(rom)
    const dir = fs.mkdtempSync(path.join(tmp, rom + '-'))
    const notes = []
    const missing = []
    const hi = path.join(versionDir, 'hi', rom + '.hi')
    if (fs.existsSync(hi)) {
        fs.mkdirSync(path.join(dir, 'hiscore'))
        fs.symlinkSync(hi, path.join(dir, 'hiscore', rom + '.hi'))
    } else if (expected.hi) {
        missing.push('.hi')
    }
    const nvDir = path.join(versionDir, 'nvram', rom)
    if (expected.nvram) {
        const files = fs.existsSync(nvDir) ? fs.readdirSync(nvDir) : []
        // MAME renamed some nvram files over time (e.g. backup1 -> mainpcb_backup1)
        const file = files.includes(expected.nvram) ? expected.nvram
            : files.find(f => expected.nvram.endsWith('_' + f) || f.endsWith('_' + expected.nvram))
        if (file) {
            fs.mkdirSync(path.join(dir, 'nvram', rom), { recursive: true })
            fs.symlinkSync(path.join(nvDir, file), path.join(dir, 'nvram', rom, expected.nvram))
            if (file !== expected.nvram) notes.push(`nvram "${file}" read as "${expected.nvram}"`)
        } else {
            missing.push(`nvram/${expected.nvram}` + (files.length ? ` (corpus has ${files.join(', ')})` : ''))
        }
    }
    return { dir, hi: fs.existsSync(hi) ? hi : null, notes, missing }
}

function formatTable(rows) {
    return rows.map(r => `${String(r.rank).padStart(3)} ${String(r.score).padStart(12)}  ${JSON.stringify(r.name)}`).join('\n')
}

async function main() {
    const args = parseArgs(process.argv.slice(2))
    if (!args.corpus) {
        console.error('Usage: npm run compare -- <hi2txt-xml>/src/test [--hiscoredat <file>] [--rom <rom>] [--json <file>]')
        process.exit(2)
    }
    const inputRoot = path.join(args.corpus, 'input')
    const oracleRoot = path.join(args.corpus, 'oracle')
    const current = args.hiscoredat ? parseHiscoreDat(args.hiscoredat) : null
    const extractors = new MameHiExtractor('')
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mhiex-compare-'))
    const results = []

    try {
        // Newest hiscore.dat first: the closest to what the extractors were written for
        const versions = fs.readdirSync(inputRoot).sort().reverse()
        for (const version of versions) {
            const versionDir = path.join(inputRoot, version)
            const roms = new Set()
            for (const sub of ['hi', 'nvram']) {
                const d = path.join(versionDir, sub)
                if (!fs.existsSync(d)) continue
                for (const f of fs.readdirSync(d)) roms.add(sub === 'hi' ? f.replace(/\.hi$/, '') : f)
            }
            for (const rom of [...roms].sort()) {
                if (!extractors.exist(rom)) continue
                if (args.rom && rom !== args.rom) continue
                const oracleFile = path.join(oracleRoot, version, rom + '.xml')
                const result = { rom, version, status: null, notes: [] }
                results.push(result)

                const staged = stage(tmp, versionDir, rom)
                result.notes.push(...staged.notes)
                if (staged.missing.length) {
                    result.status = 'NO_INPUT'
                    result.notes.push(`no ${staged.missing.join(' / ')} in the corpus`)
                    continue
                }
                if (staged.hi && current && current[rom] !== undefined) {
                    const size = fs.statSync(staged.hi).size
                    if (size !== current[rom]) {
                        result.sizeMismatch = true
                        result.notes.push(`size ${size} != ${current[rom]} (current hiscore.dat)`)
                    }
                }
                if (!fs.existsSync(oracleFile)) {
                    result.status = 'NO_ORACLE'
                    continue
                }
                const oracle = parseOracle(oracleFile).filter(t => t.rows.length && 'SCORE' in t.rows[0])
                if (!oracle.length) {
                    result.status = 'NO_ORACLE'
                    continue
                }

                let output
                try {
                    const extractor = await new MameHiExtractor(staged.dir).get(rom)
                    output = extractor.extract().scores
                } catch (e) {
                    result.status = 'ERROR'
                    result.notes.push(String(e && e.message || e).split('\n')[0])
                    continue
                }

                let def = bestMatch(output.default || [], oracle)
                // hi2txt sometimes merges what mhiex splits in extras (raiden: solo then dual) into one table
                if (def.status !== 'OK' && output.extras) {
                    const merged = bestMatch([...(output.default || []), ...Object.values(output.extras).flat()], oracle)
                    if (merged.status === 'OK') {
                        def = merged
                        result.notes.push('hi2txt merges the default and extras tables')
                    }
                }
                result.status = def.status
                if (def.status !== 'OK' && CHECKED_ON_SCREEN[rom]) {
                    result.status = 'CHECKED'
                    result.notes.push(CHECKED_ON_SCREEN[rom])
                }
                result.default = def
                result.extras = {}
                for (const [id, rows] of Object.entries(output.extras || {})) {
                    result.extras[id] = bestMatch(rows, oracle)
                }
                if (def.status !== 'OK') {
                    result.notes.push(`scores ${def.scores}/${def.n}, names ${def.names}/${def.n}, rows ${def.mineLength} vs ${def.oracleLength}`)
                }

                if (args.rom) {
                    console.log(`\n=== ${rom} @ ${version} -> ${def.status}${def.id ? ` (oracle table "${def.id}")` : ''}`)
                    console.log('--- mhiex default')
                    console.log(formatTable(output.default || []))
                    console.log('--- hi2txt')
                    console.log(formatTable(oracle[def.index].rows.map(r => ({ rank: r.RANK, score: r.SCORE, name: r.NAME }))))
                    for (const [id, c] of Object.entries(result.extras)) {
                        console.log(`--- extras "${id}" -> ${c.status}${c.id ? ` (oracle table "${c.id}")` : ''}`)
                    }
                }
            }
        }
    } finally {
        fs.rmSync(tmp, { recursive: true, force: true })
    }

    // One line per rom: its best result over all corpus versions
    const byRom = new Map()
    const order = { OK: 0, CHECKED: 1, LENGTH: 2, NAMES: 3, DIFF: 4, ERROR: 5, NO_ORACLE: 6, NO_INPUT: 7 }
    for (const r of results) {
        const prev = byRom.get(r.rom)
        if (!prev || order[r.status] < order[prev.best.status]) byRom.set(r.rom, { best: r, all: [...(prev ? prev.all : []), r] })
        else prev.all.push(r)
    }

    const groups = {}
    for (const [rom, { best, all }] of [...byRom].sort()) {
        (groups[best.status] = groups[best.status] || []).push({ rom, best, all })
    }
    const labels = {
        OK: 'OK (identical to hi2txt)',
        CHECKED: 'CHECKED (differs from hi2txt, mhiex checked against the game screen)',
        LENGTH: 'LENGTH (same rows, different row count)',
        NAMES: 'NAMES (scores match, names differ)',
        DIFF: 'DIFF (scores differ)',
        ERROR: 'ERROR (extractor threw)',
        NO_ORACLE: 'NO_ORACLE (no hi2txt decoding to compare with)',
        NO_INPUT: 'NO_INPUT (the corpus has no file in the form the extractor reads)',
    }
    console.log(`\n${byRom.size} roms compared (${results.length} rom/version pairs)`)
    for (const status of Object.keys(labels)) {
        const g = groups[status]
        if (!g) continue
        console.log(`\n## ${labels[status]}: ${g.length}`)
        if (status === 'OK') {
            console.log(g.map(x => x.rom).join(' '))
            continue
        }
        for (const { rom, best, all } of g) {
            const allSizeMismatch = all.every(r => r.sizeMismatch)
            console.log(`  ${rom.padEnd(10)} ${best.version}  ${best.notes.join('; ')}${allSizeMismatch ? '  [every input has a stale size]' : ''}`)
        }
    }
    if (args.json) {
        fs.writeFileSync(args.json, JSON.stringify(results, null, 1))
        console.log(`\nDetails written to ${args.json}`)
    }
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
