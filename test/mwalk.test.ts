import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('mwalk', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('mwalk')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 52100, name: 'NOB' },
            { rank: 2, score: 50000, name: 'M.J' },
            { rank: 3, score: 45000, name: 'M.J' },
            { rank: 4, score: 40000, name: 'M.J' },
            { rank: 5, score: 35000, name: 'M.J' },
            { rank: 6, score: 30000, name: 'M.J' },
            { rank: 7, score: 25000, name: 'M.J' },
            { rank: 8, score: 20000, name: 'M.J' },
            { rank: 9, score: 15000, name: 'M.J' },
            { rank: 10, score: 10000, name: 'M.J' },
        ]
    })
})
