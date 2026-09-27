import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// demo file from a cabinet on MAME 0.289, checked against demo-hiscores/screenshots/baddudes.png ("BEST PLAYERS")
it('baddudes', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('baddudes')
    const rows = extractor?.extract().scores.default.map(s => [s.rank, s.name, s.score, s.extra?.stage])
    expect(rows).toEqual([
        [1, 'MIN', 30000, 3], [2, 'HEN', 29000, 3], [3, 'IAM', 28000, 3], [4, 'ABO', 26000, 3],
        [5, 'YEN', 25100, 3], [6, 'AME', 25000, 3], [7, 'FUR', 24900, 2], [8, 'UHI', 23100, 2],
        [9, 'WAT', 22000, 2], [10, 'ENK', 19000, 2], [11, 'NOB', 18800, 1], [12, 'I.G', 18000, 2],
        [13, 'OMO', 17000, 2], [14, 'I.Q', 16000, 2], [15, '..?', 15500, 2], [16, 'RON', 15000, 2],
        [17, 'TMO', 13700, 2], [18, 'IKA', 5000, 1], [19, 'SFX', 3000, 1], [20, 'KYO', 2500, 1],
    ])
})
