import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('dommy', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('dommy')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 234560, name: '' },
        ],
    });
});
