import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('puckman', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('puckman')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 15940, name: '' },
        ],
    });
});
