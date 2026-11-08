import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('mspacman', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('mspacman')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: '' },
        ],
    });
});
