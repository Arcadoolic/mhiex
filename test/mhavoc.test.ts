import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('mhavoc', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('mhavoc')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ' },
            { rank: 2, score: 12345, name: 'AUK' },
            { rank: 3, score: 77285, name: 'AUK' },
            { rank: 4, score: 61122, name: 'ORR' },
            { rank: 5, score: 57072, name: 'MEC' },
            { rank: 6, score: 45852, name: 'M H' },
            { rank: 7, score: 31554, name: 'DES' },
            { rank: 8, score: 29365, name: 'G C' },
            { rank: 9, score: 8109, name: 'BAW' },
            { rank: 10, score: 5240, name: 'SYN' },
        ],
    });
});
