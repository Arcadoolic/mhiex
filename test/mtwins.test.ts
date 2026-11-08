import { MameHiExtractor } from "../dist";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";

it('mtwins', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('mtwins')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ABC' },
            { rank: 2, score: 95000, name: 'DE ' },
            { rank: 3, score: 90000, name: '  F' },
            { rank: 4, score: 85000, name: 'GHI' },
            { rank: 5, score: 80000, name: 'J  ' },
            { rank: 6, score: 75000, name: 'KL ' },
            { rank: 7, score: 70000, name: 'MNO' },
            { rank: 8, score: 65000, name: '   ' },
            { rank: 9, score: 60000, name: 'PQR' },
            { rank: 10, score: 55000, name: 'ST ' },
        ],
    });
});

// The second half of the font (screenshots mtwins.part3/part4): the same file with the names holding
// the codes 1E to 3B (the 5th row's 2C shows a glyph left unmapped).
it('mtwins letters U to Z', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'mhiex-'))
    mkdirSync(join(dir, 'hiscore'))
    copyFileSync(resolve(__dirname, '../demo-hiscores/hiscore/mtwins.hi'), join(dir, 'hiscore', 'mtwins.hi'))
    const hi = readFileSync(join(dir, 'hiscore', 'mtwins.hi'))
    Buffer.from('1e1f205b2122235b2425265b2728295b2a2b2c5b2d2e2f5b3031325b3334355b3637385b393a3b5b', 'hex').copy(hi, 400)
    writeFileSync(join(dir, 'hiscore', 'mtwins.hi'), hi)

    const scores = (await new MameHiExtractor(dir).get('mtwins'))?.extract().scores.default
    expect(scores?.slice(0, 4).map(s => s.name)).toEqual(['  U', 'VWX', 'Y  ', ' Z '])
    rmSync(dir, { recursive: true, force: true })
})
