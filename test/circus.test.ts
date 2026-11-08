import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('circus', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('circus')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 34120, name: '' },
        ],
    });
});
