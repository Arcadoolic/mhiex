import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('targ', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('targ')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 12340, name: '' },
        ],
    });
});
