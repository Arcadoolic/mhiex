import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('wilytowr', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('wilytowr')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 912345, name: '' },
            { rank: 2, score: 250, name: '' },
            { rank: 3, score: 1070, name: '' },
            { rank: 4, score: 5000, name: '' },
            { rank: 5, score: 5000, name: '' },
            { rank: 6, score: 5000, name: '' },
            { rank: 7, score: 5000, name: '' },
            { rank: 8, score: 5000, name: '' },
            { rank: 9, score: 5000, name: '' },
            { rank: 10, score: 5000, name: '' },
        ],
    });
});
