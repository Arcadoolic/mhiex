import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('kbash', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('kbash')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 40000, name: 'ABC', extra: { area: 15 } },
            { rank: 2, score: 39000, name: 'DEF', extra: { area: 14 } },
            { rank: 3, score: 38000, name: 'GHI', extra: { area: 13 } },
            { rank: 4, score: 37000, name: 'JKL', extra: { area: 12 } },
            { rank: 5, score: 36000, name: 'MNO', extra: { area: 11 } },
        ],
    });
});
