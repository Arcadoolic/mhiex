import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('avengers', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('avengers')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ' },
            { rank: 2, score: 123450, name: 'M.Y' },
            { rank: 3, score: 18000, name: 'CCC' },
            { rank: 4, score: 16000, name: 'DDD' },
            { rank: 5, score: 12000, name: 'EEE' },
            { rank: 6, score: 10000, name: 'FFF' },
            { rank: 7, score: 8000, name: 'GGG' },
        ],
    });
});
