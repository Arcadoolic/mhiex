import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('toypop', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('toypop')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ♥' },
            { rank: 2, score: 1000, name: '♥♥♥♥' },
            { rank: 3, score: 1000, name: '♥♥♥' },
            { rank: 4, score: 1000, name: '♥♥' },
            { rank: 5, score: 1000, name: '♥' },
        ],
    });
});
