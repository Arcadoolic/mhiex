import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('dday', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('dday')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 12345, name: '' },
        ],
    });
});
