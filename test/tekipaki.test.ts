import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('tekipaki', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('tekipaki')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 50000, name: 'ABZ', extra: { level: 10 } },
            { rank: 2, score: 45000, name: '09-', extra: { level: 9 } },
            { rank: 3, score: 40000, name: 'T.K', extra: { level: 8 } },
            { rank: 4, score: 35000, name: '---', extra: { level: 7 } },
            { rank: 5, score: 30000, name: '---', extra: { level: 6 } },
        ],
    });
});
