import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('kod', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('kod')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ', extra: { character: 4 } },
            { rank: 2, score: 123450, name: 'XYZ', extra: { character: 2 } },
            { rank: 3, score: 50000, name: 'OGT', extra: { character: 2 } },
            { rank: 4, score: 10000, name: 'SAT', extra: { character: 3 } },
            { rank: 5, score: 5000, name: 'SAD', extra: { character: 4 } },
        ],
    });
});
