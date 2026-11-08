import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('lazarian', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('lazarian')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 56789, name: 'ZAQ' },
            { rank: 2, score: 0, name: 'DAV' },
            { rank: 3, score: 0, name: 'SIL' },
            { rank: 4, score: 0, name: 'RUU' },
        ],
    });
});
