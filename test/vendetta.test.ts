import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('vendetta', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('vendetta')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 9876, name: 'ZAQ' },
            { rank: 2, score: 1234, name: 'M.Y' },
            { rank: 3, score: 40, name: 'CCC' },
            { rank: 4, score: 38, name: 'DDD' },
            { rank: 5, score: 30, name: 'EEE' },
            { rank: 6, score: 28, name: 'FFF' },
            { rank: 7, score: 20, name: 'GGG' },
            { rank: 8, score: 18, name: 'HHH' },
        ],
    });
});
