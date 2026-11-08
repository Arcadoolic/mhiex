import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('exvania', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('exvania')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 99, name: 'ZAQ' },
            { rank: 2, score: 8, name: 'DIG!' },
            { rank: 3, score: 6, name: 'KAN' },
            { rank: 4, score: 4, name: 'MITA' },
            { rank: 5, score: 2, name: 'SUGI' },
        ],
    });
});
