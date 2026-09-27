/*
 * Generate default hiscore files by running MAME with the mhiexdump plugin (tools/mame-plugins).
 *
 * MAME's hiscore plugin only writes a .hi once a default score is beaten; mhiexdump writes the
 * table as soon as it is in memory, then quits. The nvram MAME saves on exit is kept too, for
 * extractors that read nvram. Each file is then decoded with the matching extractor (./dist).
 *
 * Usage (run `npm run build` first):
 *   npm run dump-defaults -- [options] <rom> [<rom>...]
 *   npm run dump-defaults -- [options] --missing-demo     every extractor without a demo file
 * Options:
 *   --mame <binary>        default: mame
 *   --rompath <dir>        default: ~/.mame/roms
 *   --hiscoredat <file>    default: <mame>/../share/mame/plugins/hiscore/hiscore.dat
 *   --out <dir>            default: ./dump-defaults (laid out like demo-hiscores: hiscore/, nvram/)
 *   --timeout <seconds>    emulated seconds to wait for a table, default 120
 *
 * MAME runs with -noreadconfig and throwaway cfg/nvram directories: the user's mame.ini, cfg and
 * nvram are neither read nor touched, and nvram games start from their factory state.
 */
const fs = require('fs')
const os = require('os')
const path = require('path')
const { spawnSync, execFileSync } = require('child_process')
const { MameHiExtractor } = require('../dist')
const extractorClasses = require('../dist/Extractor').default

const root = path.resolve(__dirname, '..')

function parseArgs(argv) {
    const args = {
        mame: 'mame', rompath: path.join(os.homedir(), '.mame', 'roms'), hiscoredat: null,
        out: path.join(root, 'dump-defaults'), timeout: 120, missingDemo: false, roms: [],
    }
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i]
        if (a === '--mame') args.mame = argv[++i]
        else if (a === '--rompath') args.rompath = argv[++i]
        else if (a === '--hiscoredat') args.hiscoredat = argv[++i]
        else if (a === '--out') args.out = path.resolve(argv[++i])
        else if (a === '--timeout') args.timeout = Number(argv[++i])
        else if (a === '--missing-demo') args.missingDemo = true
        else args.roms.push(a)
    }
    return args
}

// hiscore.dat next to the mame binary (share/mame/plugins/hiscore/), following its symlink
function findHiscoreDat(mame) {
    let binary = mame
    if (!binary.includes(path.sep)) {
        try {
            binary = execFileSync('which', [mame], { encoding: 'utf8' }).trim()
        } catch {
            return null
        }
    }
    const real = fs.realpathSync(binary)
    const candidate = path.resolve(path.dirname(real), '..', 'share', 'mame', 'plugins', 'hiscore', 'hiscore.dat')
    return fs.existsSync(candidate) ? candidate : null
}

function expectedFiles(rom) {
    const extractor = new extractorClasses[rom]()
    return { hi: extractor.hasHi, nvram: extractor.nvramName || null }
}

function hasDemo(rom) {
    const expected = expectedFiles(rom)
    const demo = path.join(root, 'demo-hiscores')
    return (expected.hi !== true || fs.existsSync(path.join(demo, 'hiscore', rom + '.hi')))
        && (!expected.nvram || fs.existsSync(path.join(demo, 'nvram', rom, expected.nvram)))
}

function dump(args, officialPlugins, rom) {
    const work = fs.mkdtempSync(path.join(os.tmpdir(), `mhiexdump-${rom}-`))
    const out = path.join(work, 'out')
    for (const dir of ['out', 'cfg', 'nvram']) fs.mkdirSync(path.join(work, dir))
    try {
        const run = spawnSync(args.mame, [
            rom, '-noreadconfig', '-rompath', args.rompath, '-homepath', work,
            '-pluginspath', `${officialPlugins};${path.join(__dirname, 'mame-plugins')}`, '-plugin', 'mhiexdump',
            '-cfg_directory', path.join(work, 'cfg'), '-nvram_directory', path.join(work, 'nvram'),
            '-video', 'none', '-sound', 'none', '-nothrottle', '-skip_gameinfo',
            // Safety net if the plugin never gets to quit (it gives up after --timeout emulated seconds)
            '-seconds_to_run', String(args.timeout + 30),
        ], {
            cwd: work,
            encoding: 'utf8',
            env: { ...process.env, MHIEXDUMP_HISCOREDAT: args.hiscoredat, MHIEXDUMP_OUT: out, MHIEXDUMP_TIMEOUT: String(args.timeout) },
            timeout: 10 * 60 * 1000,
        })
        const statusFile = path.join(out, rom + '.status')
        let status = fs.existsSync(statusFile) ? fs.readFileSync(statusFile, 'utf8').trim() : null
        if (!status) {
            const output = `${run.stdout || ''}${run.stderr || ''}`
            // MAME exit codes: 2 missing ROM files, 5 unknown system
            status = run.status === 2 || /Required files are missing/.test(output) ? 'missing-rom'
                : run.status === 5 ? 'unknown-system'
                    : run.error ? `error: ${run.error.message}` : `error: mame exited ${run.status}`
        }
        const written = []
        const hi = path.join(out, rom + '.hi')
        if (fs.existsSync(hi)) {
            fs.mkdirSync(path.join(args.out, 'hiscore'), { recursive: true })
            fs.copyFileSync(hi, path.join(args.out, 'hiscore', rom + '.hi'))
            written.push(`hiscore/${rom}.hi`)
        }
        const nvram = path.join(work, 'nvram', rom)
        if (fs.existsSync(nvram) && fs.readdirSync(nvram).length) {
            fs.rmSync(path.join(args.out, 'nvram', rom), { recursive: true, force: true })
            fs.cpSync(nvram, path.join(args.out, 'nvram', rom), { recursive: true })
            written.push(`nvram/${rom}/`)
        }
        if (status === 'no-entry') status = 'no hiscore.dat entry (nvram game)'
        return { status, written }
    } finally {
        fs.rmSync(work, { recursive: true, force: true })
    }
}

async function decode(args, rom) {
    if (!extractorClasses[rom]) return 'no extractor'
    try {
        const scores = (await new MameHiExtractor(args.out).get(rom)).extract().scores.default
        return scores.slice(0, 5).map(s => `${JSON.stringify(s.name)} ${s.score}`).join(', ') + (scores.length > 5 ? ` … (${scores.length} rows)` : '')
    } catch (e) {
        return `cannot decode: ${String(e && e.message || e).split('\n')[0]}`
    }
}

async function main() {
    const args = parseArgs(process.argv.slice(2))
    args.hiscoredat = args.hiscoredat || findHiscoreDat(args.mame)
    if (!args.hiscoredat || !fs.existsSync(args.hiscoredat)) {
        console.error('hiscore.dat not found: pass --hiscoredat <file>')
        process.exit(2)
    }
    // Its directory holds boot.lua, which MAME needs to start any plugin
    const officialPlugins = path.dirname(path.dirname(args.hiscoredat))
    let roms = args.roms
    if (args.missingDemo) roms = roms.concat(Object.keys(extractorClasses).filter(rom => !hasDemo(rom)))
    if (!roms.length) {
        console.error('Usage: npm run dump-defaults -- [--mame <bin>] [--rompath <dir>] [--hiscoredat <file>] [--out <dir>] [--timeout <s>] (<rom>... | --missing-demo)')
        process.exit(2)
    }
    fs.mkdirSync(args.out, { recursive: true })
    console.log(`hiscore.dat: ${args.hiscoredat}\nout: ${args.out}\n`)
    for (const rom of [...new Set(roms)].sort()) {
        const { status, written } = dump(args, officialPlugins, rom)
        const decoded = written.length ? await decode(args, rom) : ''
        console.log(`${rom.padEnd(10)} ${status}${written.length ? `  [${written.join(', ')}]` : ''}${decoded ? `\n           ${decoded}` : ''}`)
    }
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
