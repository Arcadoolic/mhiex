import { MameHiExtractor } from "../dist";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";

var romname = 'atetris'

// MAME 0.289's blank EEPROM, and the .hi of its own hiscore.dat entry (ranks 7-16), as the game's
// screen shows them.
it(romname, async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get(romname)
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 10000, name: 'TET' },
            { rank: 2, score: 9500, name: 'RIS' },
            { rank: 3, score: 9000, name: 'TET' },
            { rank: 4, score: 8500, name: 'RIS' },
            { rank: 5, score: 8000, name: 'TET' },
            { rank: 6, score: 7500, name: 'RIS' },
            { rank: 7, score: 7000, name: 'KFT' },
            { rank: 8, score: 6500, name: 'NLA' },
            { rank: 9, score: 6000, name: 'KEM' },
            { rank: 10, score: 5500, name: 'DES' },
            { rank: 11, score: 5000, name: 'GFM' },
            { rank: 12, score: 4500, name: 'ED ' },
            { rank: 13, score: 4000, name: 'BAF' },
            { rank: 14, score: 3500, name: 'JMR' },
            { rank: 15, score: 3000, name: 'RBD' },
            { rank: 16, score: 2500, name: 'LVR' },
        ]
    })
})

// Players' scores, stored out of order: as on the screen, best first.
it(`${romname} with players' scores`, async () => {
    const eeprom = readFileSync(resolve(__dirname, '../demo-hiscores/nvram/atetris/eeprom'))
    const initials = (name: string) => [...name].reduce((packed, letter) => packed * 32 + letter.charCodeAt(0) - 65, 0)
    const entries: [string, string][] = [['146507', 'ABC'], ['176673', 'XYZ'], ['165058', 'ABC'], ['099575', 'ABC'], ['098094', 'ABC'], ['358899', 'ABC']]
    entries.forEach(([score, name], index) => {
        Buffer.from(score, 'hex').copy(eeprom, 0x1e0 + index * 5)
        eeprom.writeUInt16BE(initials(name), 0x1e0 + index * 5 + 3)
    })
    const dir = mkdtempSync(join(tmpdir(), 'mhiex-'))
    mkdirSync(join(dir, 'nvram', romname), { recursive: true })
    writeFileSync(join(dir, 'nvram', romname, 'eeprom'), eeprom)

    const extractor = await new MameHiExtractor(dir).get(romname)
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 358899, name: 'ABC' },
            { rank: 2, score: 176673, name: 'XYZ' },
            { rank: 3, score: 165058, name: 'ABC' },
            { rank: 4, score: 146507, name: 'ABC' },
            { rank: 5, score: 99575, name: 'ABC' },
            { rank: 6, score: 98094, name: 'ABC' },
        ]
    })
    rmSync(dir, { recursive: true, force: true })
})

// A score under the 6th is not saved in the EEPROM: it only lives in RAM, saved to the .hi by MAUI's
// corrected hiscore.dat (the whole table, 0x90 bytes), whose ranks 1-6 are the EEPROM's.
it(`${romname} with a score under the 6th`, async () => {
    const eeprom = readFileSync(resolve(__dirname, '../demo-hiscores/nvram/atetris/eeprom'))
    const table: [number, string][] = [
        [10000, 'TET'], [9500, 'RIS'], [9000, 'TET'], [8500, 'RIS'], [8000, 'TET'], [7500, 'RIS'],
        [7000, 'KFT'], [6500, 'NLA'], [6109, 'NOB'], [6000, 'KEM'], [5500, 'DES'], [5000, 'GFM'],
        [4500, 'ED '], [4000, 'BAF'], [3500, 'JMR'], [3000, 'RBD'],
    ]
    const hi = Buffer.from(table.map(([score]) => String(score).padStart(6, '0')).join('') + table.map(([, name]) => name).join(''))
    const dir = mkdtempSync(join(tmpdir(), 'mhiex-'))
    mkdirSync(join(dir, 'nvram', romname), { recursive: true })
    mkdirSync(join(dir, 'hiscore'))
    writeFileSync(join(dir, 'nvram', romname, 'eeprom'), eeprom)
    writeFileSync(join(dir, 'hiscore', `${romname}.hi`), hi)

    const scores = (await new MameHiExtractor(dir).get(romname))?.extract().scores.default
    expect(scores?.slice(0, 1)).toEqual([{ rank: 1, score: 10000, name: 'TET' }])
    expect(scores?.slice(6, 10)).toEqual([
        { rank: 7, score: 7000, name: 'KFT' },
        { rank: 8, score: 6500, name: 'NLA' },
        { rank: 9, score: 6109, name: 'NOB' },
        { rank: 10, score: 6000, name: 'KEM' },
    ])
    expect(scores).toHaveLength(16)
    rmSync(dir, { recursive: true, force: true })
})

// A .hi behind the EEPROM (its ranks 1-6 are not the EEPROM's): its ranks 7-16 are behind too.
it(`${romname} with a .hi behind the EEPROM`, async () => {
    const eeprom = readFileSync(resolve(__dirname, '../demo-hiscores/nvram/atetris/eeprom'))
    Buffer.from('358899', 'hex').copy(eeprom, 0x1e0)
    eeprom.writeUInt16BE(0, 0x1e0 + 3)
    const dir = mkdtempSync(join(tmpdir(), 'mhiex-'))
    mkdirSync(join(dir, 'nvram', romname), { recursive: true })
    mkdirSync(join(dir, 'hiscore'))
    writeFileSync(join(dir, 'nvram', romname, 'eeprom'), eeprom)
    writeFileSync(join(dir, 'hiscore', `${romname}.hi`), readFileSync(resolve(__dirname, '../demo-hiscores/hiscore/atetris.hi')))

    const scores = (await new MameHiExtractor(dir).get(romname))?.extract().scores.default
    expect(scores).toHaveLength(6)
    expect(scores?.[0]).toEqual({ rank: 1, score: 358899, name: 'AAA' })
    rmSync(dir, { recursive: true, force: true })
})
