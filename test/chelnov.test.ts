import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('chelnov', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('chelnov')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 50000, name: 'ABC' },
            { rank: 2, score: 45000, name: 'AAA' },
            { rank: 3, score: 40000, name: 'BBB' },
            { rank: 4, score: 35000, name: 'CCC' },
            { rank: 5, score: 30000, name: 'DDD' },
            { rank: 6, score: 25000, name: 'EEE' },
            { rank: 7, score: 20000, name: 'FFF' },
            { rank: 8, score: 17000, name: 'GGG' },
            { rank: 9, score: 15000, name: 'HHH' },
            { rank: 10, score: 12000, name: 'III' },
            { rank: 11, score: 10000, name: 'JJJ' },
        ],
    });
});
