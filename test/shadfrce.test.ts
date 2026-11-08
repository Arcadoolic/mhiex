import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('shadfrce', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('shadfrce')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 9876540, name: 'ZAQ', extra: { character: 3 } },
            { rank: 2, score: 123450, name: 'M.Y', extra: { character: 4 } },
            { rank: 3, score: 30000, name: 'MAT', extra: { character: 2 } },
            { rank: 4, score: 20000, name: 'TJC', extra: { character: 3 } },
            { rank: 5, score: 10000, name: 'ATI', extra: { character: 0 } },
        ],
    });
});
