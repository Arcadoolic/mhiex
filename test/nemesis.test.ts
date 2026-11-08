import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('nemesis', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('nemesis')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'Z.Q', extra: { sign: 11 } },
            { rank: 2, score: 12345, name: 'B.C', extra: { sign: 0 } },
            { rank: 3, score: 33300, name: 'K.Y', extra: { sign: 5 } },
            { rank: 4, score: 25700, name: 'K.K', extra: { sign: 7 } },
            { rank: 5, score: 21500, name: 'K.N', extra: { sign: 3 } },
            { rank: 6, score: 17700, name: 'M.N', extra: { sign: 10 } },
            { rank: 7, score: 13200, name: 'K.O', extra: { sign: 1 } },
            { rank: 8, score: 10000, name: 'M.I', extra: { sign: 2 } },
            { rank: 9, score: 9500, name: 'T.K', extra: { sign: 5 } },
            { rank: 10, score: 7600, name: 'M.D', extra: { sign: 8 } },
        ],
    });
});
