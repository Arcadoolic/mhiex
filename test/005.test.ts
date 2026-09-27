import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// demo file from a cabinet on MAME 0.289 (99 75 12 50 00...): the game keeps no names, and its attract
// mode shows no ranking to check against; the decoding matches hi2txt's.
it('005', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('005')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 12750, name: '' },
            { rank: 2, score: 500, name: '' },
            { rank: 3, score: 0, name: '' },
            { rank: 4, score: 0, name: '' },
            { rank: 5, score: 0, name: '' },
        ]
    })
})
