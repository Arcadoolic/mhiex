import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('carnival', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('carnival')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 34120, name: 'ABC' },
            { rank: 2, score: 1560, name: 'DEF' },
            { rank: 3, score: 3020, name: 'GHI' },
        ],
    });
});
