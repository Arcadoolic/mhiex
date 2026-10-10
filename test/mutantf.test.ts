import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('mutantf', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('mutantf')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 100000, name: 'ABC', extra: { stage: 6 } },
            { rank: 2, score: 90000, name: 'DEF', extra: { stage: 5 } },
            { rank: 3, score: 80000, name: 'GHI', extra: { stage: 4 } },
            { rank: 4, score: 70000, name: 'JKL', extra: { stage: 3 } },
            { rank: 5, score: 60000, name: 'MNO', extra: { stage: 2 } },
        ],
    });
});
