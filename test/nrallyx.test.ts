import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('nrallyx', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('nrallyx')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 123450, name: '' },
        ],
    });
});
