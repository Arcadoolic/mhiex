import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// demo file from a cabinet on MAME 0.289 (the game's default table): the scores are checked against
// demo-hiscores/screenshots/avspirit.png ("TODAY'S HI SCORE"), which does not show the names.
it('avspirit', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('avspirit')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 100000, name: 'JAL' },
            { rank: 2, score: 90000, name: 'B.R' },
            { rank: 3, score: 80000, name: 'R.L' },
            { rank: 4, score: 70000, name: 'P.A' },
            { rank: 5, score: 60000, name: 'L.K' },
            { rank: 6, score: 50000, name: 'HAC' },
            { rank: 7, score: 40000, name: 'S.D' },
            { rank: 8, score: 30000, name: 'TAK' },
            { rank: 9, score: 20000, name: 'P47' },
            { rank: 10, score: 10000, name: 'BUT' },
        ]
    })
})
