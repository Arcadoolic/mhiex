import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('bnj', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('bnj')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 10012, name: 'SAW' },
            { rank: 2, score: 7684, name: 'KIS' },
            { rank: 3, score: 5328, name: 'SUZ' },
            { rank: 4, score: 3236, name: 'KIT' },
            { rank: 5, score: 1982, name: 'YOS' },
        ],
    });
});
