import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('zektor', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('zektor')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 876500, name: 'ZAQ' },
            { rank: 2, score: 28000, name: 'CGW' },
            { rank: 3, score: 27000, name: 'SLP' },
            { rank: 4, score: 26000, name: 'DPB' },
            { rank: 5, score: 25000, name: 'BAC' },
        ],
    });
});
