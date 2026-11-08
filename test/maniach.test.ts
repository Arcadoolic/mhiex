import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('maniach', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('maniach')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 6587090, name: 'ZAQ' },
            { rank: 2, score: 4523010, name: 'PRM' },
            { rank: 3, score: 30000, name: 'LDS' },
            { rank: 4, score: 30000, name: 'JJM' },
            { rank: 5, score: 30000, name: 'TJL' },
            { rank: 6, score: 30000, name: 'AJF' },
            { rank: 7, score: 30000, name: 'DDD' },
            { rank: 8, score: 30000, name: 'RLR' },
            { rank: 9, score: 30000, name: 'LGS' },
            { rank: 10, score: 30000, name: 'JVL' },
        ],
    });
});
