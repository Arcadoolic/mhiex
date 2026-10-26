import { MameHiExtractor } from "../dist";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";

var romname = 'atetris'

// A blank EEPROM, as MAME 0.289 writes it.
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
