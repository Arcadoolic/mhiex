import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('renegade', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('renegade')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 870900, name: 'ZAQ' },
            { rank: 2, score: 410000, name: 'M.Y' },
            { rank: 3, score: 30000, name: 'LDS' },
            { rank: 4, score: 20000, name: 'JJM' },
            { rank: 5, score: 10000, name: 'TJL' },
        ],
    });
});
