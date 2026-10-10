import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('fghthist', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('fghthist')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 50000, name: 'AAA' },
            { rank: 2, score: 40000, name: 'BBB' },
            { rank: 3, score: 30000, name: 'CCC' },
            { rank: 4, score: 20000, name: 'DDD' },
            { rank: 5, score: 10000, name: 'EEE' },
        ],
    });
});
