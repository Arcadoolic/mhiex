import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('zaxxon', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('zaxxon')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 8900, name: 'ABC' },
            { rank: 2, score: 7400, name: 'JZ.' },
            { rank: 3, score: 6600, name: '' },
            { rank: 4, score: 5100, name: '' },
            { rank: 5, score: 4300, name: '' },
            { rank: 6, score: 3700, name: '' },
        ],
    });
});
