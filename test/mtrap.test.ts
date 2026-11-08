import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('mtrap', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('mtrap')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 49720, name: 'LWH' },
            { rank: 2, score: 47340, name: 'DJS' },
            { rank: 3, score: 44130, name: 'VIC' },
            { rank: 4, score: 37830, name: 'MRK' },
            { rank: 5, score: 987650, name: 'ZAQ' },
        ],
    });
});
