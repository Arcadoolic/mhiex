import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('gberet', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('gberet')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 98765, name: 'ZAQ' },
            { rank: 2, score: 12345, name: 'XYZ' },
            { rank: 3, score: 29000, name: 'KEF' },
            { rank: 4, score: 26000, name: 'OFS' },
            { rank: 5, score: 23000, name: 'BAW' },
            { rank: 6, score: 20000, name: 'CBX' },
            { rank: 7, score: 19000, name: 'IMF' },
            { rank: 8, score: 16000, name: 'TUA' },
            { rank: 9, score: 13000, name: 'YIK' },
            { rank: 10, score: 10000, name: 'ECC' },
        ],
    });
});
