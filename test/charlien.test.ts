import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('charlien', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('charlien')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 40000, name: 'M.Y' },
            { rank: 2, score: 9876543, name: 'Z.Q' },
            { rank: 3, score: 35000, name: 'N.N' },
            { rank: 4, score: 30000, name: 'K.T' },
            { rank: 5, score: 25000, name: 'T.T' },
        ],
    });
});
