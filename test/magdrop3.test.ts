import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// demo-hiscores/screenshots/magdrop3.jpg: the attract mode's three rankings from this saveram.
it('magdrop3', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('magdrop3')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 16120, name: 'ABC' },
            { rank: 2, score: 15130, name: 'DEF' },
            { rank: 3, score: 14140, name: 'GHI' },
            { rank: 4, score: 13150, name: 'JKL' },
            { rank: 5, score: 12160, name: 'MNO' },
        ],
        extras: {
            journey: [
                { rank: 1, score: 27230, name: 'PQR' },
                { rank: 2, score: 26240, name: 'STU' },
                { rank: 3, score: 25250, name: 'VWX' },
                { rank: 4, score: 24260, name: 'YZ.' },
                { rank: 5, score: 23270, name: 'ABC' },
            ],
            survival: [
                { rank: 1, score: 38340, name: 'DEF' },
                { rank: 2, score: 37350, name: 'GHI' },
                { rank: 3, score: 36360, name: 'JKL' },
                { rank: 4, score: 35370, name: 'MNO' },
                { rank: 5, score: 34380, name: 'PQR' },
            ],
        },
    })
    const withExtra = extractor?.extract(true).scores
    expect(withExtra?.default[1].extra).toEqual({ reactions: 7, time: '05:30', character: 0x15 })
    expect(withExtra?.extras?.journey[0].extra).toEqual({ spaces: 12, character: 0 })
    expect(withExtra?.extras?.survival[4].extra).toEqual({ reactions: 8 })
})
