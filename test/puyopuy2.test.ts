import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('puyopuy2', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('puyopuy2')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 18594, name: 'SAT', extra: { blocks: 416 } },
            { rank: 2, score: 16976, name: 'LUL', extra: { blocks: 348 } },
            { rank: 3, score: 12382, name: 'MIN', extra: { blocks: 204 } },
            { rank: 4, score: 9260, name: 'WIT', extra: { blocks: 137 } },
            { rank: 5, score: 6650, name: 'NAS', extra: { blocks: 152 } },
        ],
    });
});
