import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('uniwars', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('uniwars')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 123450, name: '' },
        ],
    });
});
