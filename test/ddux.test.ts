import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('ddux', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('ddux')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 12345678, name: 'ABCD' },
            { rank: 2, score: 90000, name: 'KIM' },
            { rank: 3, score: 80000, name: 'KEY' },
            { rank: 4, score: 70000, name: 'OHT' },
            { rank: 5, score: 60000, name: 'OKA' },
            { rank: 6, score: 50000, name: 'JII' },
            { rank: 7, score: 40000, name: 'HIR' },
            { rank: 8, score: 30000, name: 'SAD' },
            { rank: 9, score: 20000, name: 'GUD' },
            { rank: 10, score: 10000, name: 'TAK' },
        ],
    });
});
