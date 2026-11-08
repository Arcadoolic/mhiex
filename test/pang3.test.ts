import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('pang3', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('pang3')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 50000, name: 'PL2', extra: { character: 1, stage: 40 } },
            { rank: 2, score: 987650, name: 'ZAQ', extra: { character: 3, stage: 10 } },
            { rank: 3, score: 30000, name: 'PL3', extra: { character: 2, stage: 30 } },
            { rank: 4, score: 20000, name: 'PL4', extra: { character: 3, stage: 20 } },
            { rank: 5, score: 10000, name: 'PL5', extra: { character: 0, stage: 10 } },
        ],
        extras: {
            panic: [
                { rank: 1, score: 123450, name: 'XYZ', extra: { character: 1, stage: 20 } },
                { rank: 2, score: 40000, name: 'PL2', extra: { character: 1, stage: 40 } },
                { rank: 3, score: 30000, name: 'PL3', extra: { character: 2, stage: 30 } },
                { rank: 4, score: 20000, name: 'PL4', extra: { character: 3, stage: 20 } },
                { rank: 5, score: 10000, name: 'PL5', extra: { character: 0, stage: 10 } },
            ],
        },
    });
});
