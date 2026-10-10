import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('actfancr', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('actfancr')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 500000, name: 'AAA' },
            { rank: 2, score: 400000, name: 'BBB' },
            { rank: 3, score: 300000, name: 'CCC' },
            { rank: 4, score: 200000, name: 'DDD' },
            { rank: 5, score: 100000, name: 'EEE' },
        ],
    });
});
