import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('cbuster', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('cbuster')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 1000000, name: '' },
            { rank: 2, score: 900000, name: '' },
            { rank: 3, score: 800000, name: '' },
            { rank: 4, score: 700000, name: '' },
            { rank: 5, score: 600000, name: '' },
            { rank: 6, score: 500000, name: '' },
            { rank: 7, score: 400000, name: '' },
            { rank: 8, score: 300000, name: '' },
            { rank: 9, score: 200000, name: '' },
            { rank: 10, score: 100000, name: '' },
        ],
    });
});
