import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('venture', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('venture')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 121990, name: 'DJS' },
            { rank: 2, score: 83440, name: 'VIC' },
            { rank: 3, score: 62130, name: 'MCH' },
            { rank: 4, score: 61830, name: 'MRK' },
            { rank: 5, score: 987650, name: 'ZAQ' },
        ],
    });
});
