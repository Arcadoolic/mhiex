import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('mpatrol', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('mpatrol')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 123450, name: '' },
        ],
    });
});
