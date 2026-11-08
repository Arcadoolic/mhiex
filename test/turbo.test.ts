import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('turbo', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('turbo')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 12345, name: '' },
            { rank: 2, score: 6789, name: '' },
            { rank: 3, score: 0, name: '' },
            { rank: 4, score: 0, name: '' },
            { rank: 5, score: 0, name: '' },
            { rank: 6, score: 0, name: '' },
            { rank: 7, score: 0, name: '' },
            { rank: 8, score: 0, name: '' },
            { rank: 9, score: 0, name: '' },
            { rank: 10, score: 0, name: '' },
        ],
    });
});
