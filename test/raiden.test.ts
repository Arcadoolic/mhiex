import { MameHiExtractor } from "../dist";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join, resolve } from "path";

it('raiden', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('raiden')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 50000, name: '...' },
            { rank: 2, score: 45000, name: '...' },
            { rank: 3, score: 40000, name: '...' },
            { rank: 4, score: 35000, name: '...' },
            { rank: 5, score: 30000, name: '...' },
            { rank: 6, score: 28730, name: 'NAS' },
            { rank: 7, score: 25000, name: '...' },
            { rank: 8, score: 24320, name: 'N  ' },
            { rank: 9, score: 20000, name: '...' }
        ],
        extras: {
            dual : [
                { rank: 1, score: 56620, name: 'A .' },
                { rank: 2, score: 50000, name: '...' },
                { rank: 3, score: 45000, name: '...' },
                { rank: 4, score: 40000, name: '...' },
                { rank: 5, score: 35000, name: '...' },
                { rank: 6, score: 31410, name: ' ..' },
                { rank: 7, score: 30000, name: '...' },
                { rank: 8, score: 25000, name: '...' },
                { rank: 9, score: 20000, name: '...' }
            ],
        }
    })
})

// Scores are 32-bit little-endian: a .hi from arcade-digdug (2026-11-05) where the screen shows
// NOB 69630 at stage 1-2, once read as 4094 when only the low 16 bits were decoded.
it('raiden score above 65535', async () => {
    const hi = Buffer.from(
        'fe0f010002004e4f420050c3000001002e2e2e00c8af000001002e2e2e0004ab000001004e4f4200d89f000001004e4f4200'
        + '409c000001002e2e2e004097000001004e4f4200328c000001004e4f4200b888000001002e2e2e0050c3000001002e2e2e00'
        + 'c8af000001002e2e2e00409c000001002e2e2e00b888000001002e2e2e003075000001002e2e2e00a861000001002e2e2e00'
        + '204e000001002e2e2e00983a000001002e2e2e001027000001002e2e2e00', 'hex')
    const dir = mkdtempSync(join(tmpdir(), 'mhiex-'))
    mkdirSync(join(dir, 'hiscore'))
    writeFileSync(join(dir, 'hiscore', 'raiden.hi'), hi)

    const scores = (await new MameHiExtractor(dir).get('raiden'))?.extract().scores.default
    expect(scores?.map(s => s.score)).toEqual([69630, 50000, 45000, 43780, 40920, 40000, 38720, 35890, 35000])
    expect(scores?.[0]).toEqual({ rank: 1, score: 69630, name: 'NOB' })
    rmSync(dir, { recursive: true, force: true })
})
