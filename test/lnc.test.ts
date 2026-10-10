import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('lnc', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('lnc')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 12340, name: 'ABZ' },
            { rank: 2, score: 9870, name: 'LNC' },
            { rank: 3, score: 0, name: '' },
            { rank: 4, score: 0, name: '' },
            { rank: 5, score: 0, name: '' },
        ],
    });
});
