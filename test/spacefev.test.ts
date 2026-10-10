import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('spacefev', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('spacefev')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 33333, name: '' },
        ],
        extras: {
            B: [{ rank: 1, score: 22222, name: '' }],
            C: [{ rank: 1, score: 11111, name: '' }],
        },
    });
});
