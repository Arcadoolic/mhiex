import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('thunderx', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('thunderx')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 123450, name: 'ZAQ' },
            { rank: 2, score: 9000, name: 'XYZ' },
            { rank: 3, score: 8000, name: 'CCC' },
            { rank: 4, score: 7000, name: 'DDD' },
            { rank: 5, score: 6000, name: 'EEE' },
            { rank: 6, score: 5000, name: 'FFF' },
            { rank: 7, score: 4000, name: 'GGG' },
            { rank: 8, score: 3000, name: 'HHH' },
            { rank: 9, score: 2000, name: 'III' },
            { rank: 10, score: 1000, name: 'JJJ' },
        ],
    });
});
