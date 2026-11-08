import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('hcastle', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('hcastle')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987600, name: 'ZAQ', extra: { stage: 7 } },
            { rank: 2, score: 123400, name: 'BBB', extra: { stage: 1 } },
            { rank: 3, score: 46000, name: 'CCC', extra: { stage: 1 } },
            { rank: 4, score: 44000, name: 'DDD', extra: { stage: 1 } },
            { rank: 5, score: 42000, name: 'EEE', extra: { stage: 1 } },
            { rank: 6, score: 40000, name: 'FFF', extra: { stage: 1 } },
            { rank: 7, score: 38000, name: 'GGG', extra: { stage: 1 } },
            { rank: 8, score: 36000, name: 'HHH', extra: { stage: 1 } },
            { rank: 9, score: 34000, name: 'III', extra: { stage: 1 } },
            { rank: 10, score: 32000, name: 'JJJ', extra: { stage: 1 } },
        ],
    });
});
