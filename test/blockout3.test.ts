import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('blockout3', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('blockout3')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 9876543, name: 'ZAQ', extra: { faces: 1234 } },
            { rank: 2, score: 9000, name: 'XY?', extra: { faces: 45 } },
            { rank: 3, score: 8000, name: 'KIS', extra: { faces: 40 } },
            { rank: 4, score: 7000, name: 'KAI', extra: { faces: 35 } },
            { rank: 5, score: 6000, name: 'KEN', extra: { faces: 30 } },
            { rank: 6, score: 5000, name: 'GEN', extra: { faces: 25 } },
            { rank: 7, score: 4000, name: 'OBI', extra: { faces: 20 } },
            { rank: 8, score: 3000, name: 'YAM', extra: { faces: 15 } },
            { rank: 9, score: 2000, name: 'HIR', extra: { faces: 10 } },
            { rank: 10, score: 1000, name: 'NOG', extra: { faces: 5 } },
        ],
    });
});
