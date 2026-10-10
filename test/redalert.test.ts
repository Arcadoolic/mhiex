import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('redalert', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('redalert')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 123450, name: '' },
        ],
    });
});
