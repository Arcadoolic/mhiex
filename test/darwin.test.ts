import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('darwin', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('darwin')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 44830, name: 'ABZ' },
            { rank: 2, score: 37410, name: '???' },
            { rank: 3, score: 20570, name: '09.' },
        ],
    });
});
