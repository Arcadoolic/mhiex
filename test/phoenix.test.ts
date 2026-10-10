import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('phoenix', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('phoenix')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 5120, name: '' },
        ],
    });
});
