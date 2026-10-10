import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('supbtime', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('supbtime')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 100000, name: 'ORT' },
            { rank: 2, score: 99800, name: 'MAU' },
            { rank: 3, score: 89800, name: 'AST' },
            { rank: 4, score: 79800, name: 'EII' },
            { rank: 5, score: 69800, name: 'WKE' },
            { rank: 6, score: 59800, name: 'AAI' },
            { rank: 7, score: 49800, name: 'SKK' },
            { rank: 8, score: 39800, name: 'EEE' },
            { rank: 9, score: 28800, name: 'KNY' },
            { rank: 10, score: 17800, name: 'AAO' },
        ],
    });
});
