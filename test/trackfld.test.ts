import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// demo nvram: marker scores written in the 160 ranking slots, then saved back by MAME 0.289,
// which keeps the first 100 and zeroes the others. The first 10 are checked against
// demo-hiscores/screenshots/trackfld.png ("RANKING THE BEST 200"); the event records are all zero.
it('trackfld', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('trackfld')
    const scores = extractor?.extract().scores
    expect(scores?.default.slice(0, 10)).toEqual([
        { rank: 1, score: 16000, name: '   ' },
        { rank: 2, score: 15900, name: ' A ' },
        { rank: 3, score: 15800, name: ' B ' },
        { rank: 4, score: 15700, name: ' C ' },
        { rank: 5, score: 15600, name: ' D ' },
        { rank: 6, score: 15500, name: ' E ' },
        { rank: 7, score: 15400, name: ' F ' },
        { rank: 8, score: 15300, name: ' G ' },
        { rank: 9, score: 15200, name: ' H ' },
        { rank: 10, score: 15100, name: ' I ' },
    ])
    // Empty slots (score 0) are not part of the ranking
    expect(scores?.default).toHaveLength(100)
    expect(scores?.default[99]).toEqual({ rank: 100, score: 6100, name: 'CU ' })
})
