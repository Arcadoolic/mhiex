import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('tacscan', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('tacscan')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 98765, name: 'ZAQ' },
            { rank: 2, score: 19600, name: 'DBM' },
            { rank: 3, score: 18900, name: 'HAL' },
            { rank: 4, score: 18200, name: 'WLS' },
            { rank: 5, score: 17500, name: 'BCH' },
        ],
    });
});
