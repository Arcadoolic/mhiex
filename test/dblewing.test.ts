import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('dblewing', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('dblewing')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 29170, name: 'ZAQ' },
            { rank: 2, score: 4890, name: 'M.Y' },
            { rank: 3, score: 3200, name: 'ABC' },
            { rank: 4, score: 10000, name: '---' },
            { rank: 5, score: 10000, name: '---' },
            { rank: 6, score: 10000, name: '---' },
            { rank: 7, score: 10000, name: '---' },
            { rank: 8, score: 10000, name: '---' },
            { rank: 9, score: 10000, name: '---' },
            { rank: 10, score: 10000, name: '---' },
        ],
        extras: {
            dual: [
                { rank: 1, score: 6450, name: 'XYZ' },
                { rank: 2, score: 10000, name: '---' },
                { rank: 3, score: 10000, name: '---' },
                { rank: 4, score: 10000, name: '---' },
                { rank: 5, score: 10000, name: '---' },
                { rank: 6, score: 10000, name: '---' },
                { rank: 7, score: 10000, name: '---' },
                { rank: 8, score: 10000, name: '---' },
                { rank: 9, score: 10000, name: '---' },
                { rank: 10, score: 10000, name: '---' },
            ],
        },
    });
});
