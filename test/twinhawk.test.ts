import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('twinhawk', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('twinhawk')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 40000, name: 'ABC', extra: { area: 5 } },
            { rank: 2, score: 39000, name: 'DEF', extra: { area: 4 } },
            { rank: 3, score: 38000, name: 'GHI', extra: { area: 3 } },
            { rank: 4, score: 37000, name: 'JKL', extra: { area: 2 } },
            { rank: 5, score: 36000, name: 'MNO', extra: { area: 1 } },
        ],
    });
});
