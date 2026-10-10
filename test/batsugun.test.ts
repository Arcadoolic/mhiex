import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('batsugun', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('batsugun')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 200000, name: 'ABZ', extra: { stage: 5 } },
            { rank: 2, score: 180000, name: '09-', extra: { stage: 1 } },
            { rank: 3, score: 160000, name: '---' },
            { rank: 4, score: 140000, name: '---' },
            { rank: 5, score: 120000, name: '---' },
            { rank: 6, score: 100000, name: '---' },
            { rank: 7, score: 80000, name: '---' },
            { rank: 8, score: 60000, name: '---' },
        ],
    });
});
