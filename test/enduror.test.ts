import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('enduror', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('enduror')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 1000000, name: 'ABCD', extra: { time: '13\'21"45' } },
            { rank: 2, score: 900000, name: 'Z.9', extra: { time: '4\'59"12' } },
            { rank: 3, score: 800000, name: 'KAW' },
            { rank: 4, score: 700000, name: 'HOK' },
            { rank: 5, score: 600000, name: 'SAT' },
            { rank: 6, score: 500000, name: 'KAW' },
            { rank: 7, score: 400000, name: 'ICI' },
        ],
    });
});
