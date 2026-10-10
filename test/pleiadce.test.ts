import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// A game over at 60 points: the file still has HI-SCORE at 0, and 60 in SCORE1.
it('pleiadce', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('pleiadce')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 60, name: '' },
        ],
    });
});
