import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('bogeyman', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('bogeyman')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQUIET', extra: { house: 23 } },
            { rank: 2, score: 123450, name: 'TECHNOS', extra: { house: 7 } },
            { rank: 3, score: 80000, name: 'TECHNOS', extra: { house: 8 } },
            { rank: 4, score: 70000, name: 'TECHNOS', extra: { house: 7 } },
            { rank: 5, score: 60000, name: 'TECHNOS', extra: { house: 6 } },
        ],
    });
});
