import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('drgnbstr', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('drgnbstr')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 917650, name: '' },
        ],
    });
});
