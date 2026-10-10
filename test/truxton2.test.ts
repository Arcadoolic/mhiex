import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('truxton2', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('truxton2')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 150000, name: 'TOA', extra: { stage: 1 } },
            { rank: 2, score: 140000, name: 'TOA', extra: { stage: 1 } },
            { rank: 3, score: 130000, name: 'TOA', extra: { stage: 1 } },
            { rank: 4, score: 120000, name: 'TOA', extra: { stage: 1 } },
            { rank: 5, score: 110000, name: 'TOA', extra: { stage: 1 } },
            { rank: 6, score: 100000, name: 'TOA', extra: { stage: 1 } },
            { rank: 7, score: 90000, name: 'TOA', extra: { stage: 1 } },
            { rank: 8, score: 80000, name: 'TOA', extra: { stage: 1 } },
            { rank: 9, score: 70000, name: 'TOA', extra: { stage: 1 } },
            { rank: 10, score: 60000, name: 'TOA', extra: { stage: 1 } },
        ],
    });
});
