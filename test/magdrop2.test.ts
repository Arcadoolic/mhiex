import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// demo-hiscores/screenshots/magdrop2.jpg: the attract mode's two rankings from this saveram (the
// first table, in pink, then the third, in yellow, its 3 drawn like an 8). The second is never shown.
it('magdrop2', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('magdrop2')
    expect(extractor?.tables).toEqual({ default: 'Puzzle', vs_cpu: 'VS CPU' })
    expect(a.tables('magdrop2')).toEqual(extractor?.tables)
    expect(a.tables('raiden')).toEqual({})
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 38340, name: 'DEF' },
            { rank: 2, score: 37350, name: 'GHI' },
            { rank: 3, score: 36360, name: 'JKL' },
            { rank: 4, score: 35370, name: 'MNO' },
            { rank: 5, score: 34380, name: 'PQR' },
        ],
        extras: {
            vs_cpu: [
                { rank: 1, score: 16120, name: 'ABC' },
                { rank: 2, score: 15130, name: 'DEF' },
                { rank: 3, score: 14140, name: 'GHI' },
                { rank: 4, score: 13150, name: 'JKL' },
                { rank: 5, score: 12160, name: 'MNO' },
            ],
            table2: [
                { rank: 1, score: 27230, name: 'PQR' },
                { rank: 2, score: 26240, name: 'STU' },
                { rank: 3, score: 25250, name: 'VWX' },
                { rank: 4, score: 24260, name: 'YZ.' },
                { rank: 5, score: 23270, name: 'ABC' },
            ],
        },
    })
})
