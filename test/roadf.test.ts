import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('roadf', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('roadf')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 98765, name: 'ZAQ' },
            { rank: 2, score: 12345, name: 'ABC' },
            { rank: 3, score: 10000, name: 'ABC' },
            { rank: 4, score: 10000, name: 'ABC' },
            { rank: 5, score: 10000, name: 'ABC' },
            { rank: 6, score: 10000, name: 'ABC' },
            { rank: 7, score: 10000, name: 'ABC' },
            { rank: 8, score: 10000, name: 'ABC' },
            { rank: 9, score: 10000, name: 'ABC' },
            { rank: 10, score: 10000, name: 'ABC' },
        ],
    });
});
