import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// demo nvram: MAME 0.289 default nvram with marker values written in the score records,
// checked against demo-hiscores/screenshots/hyperspt.part1.png (todays best 10) and .part2.png (medalist).
// The event world records are all zero in this file, so they are not asserted.
it('hyperspt', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('hyperspt')
    const scores = extractor?.extract().scores
    expect(scores?.default).toEqual([
        { rank: 1, score: 312340, name: 'DDD' },
        { rank: 2, score: 412340, name: 'EEE' },
        { rank: 3, score: 512340, name: 'FFF' },
        { rank: 4, score: 612340, name: 'GGG' },
        { rank: 5, score: 712340, name: 'HHH' },
        { rank: 6, score: 812340, name: 'III' },
        { rank: 7, score: 912340, name: 'JJJ' },
        { rank: 8, score: 1012340, name: 'KKK' },
        { rank: 9, score: 1112340, name: 'LLL' },
        { rank: 10, score: 1212340, name: 'MMM' },
    ])
    expect(scores?.extras?.medalist).toEqual([
        { rank: 1, score: 12340, name: 'AAA' },
        { rank: 2, score: 112340, name: 'BBB' },
        { rank: 3, score: 212340, name: 'CCC' },
    ])
})
