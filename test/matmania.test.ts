import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('matmania', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('matmania')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 6587090, name: 'ZAQ', extra: { round: 11 } },
            { rank: 2, score: 4523010, name: 'LPS', extra: { round: 5 } },
            { rank: 3, score: 20000, name: 'JEK', extra: { round: 4 } },
            { rank: 4, score: 15000, name: 'AAK', extra: { round: 3 } },
            { rank: 5, score: 10000, name: 'LLS', extra: { round: 2 } },
        ],
    });
});
