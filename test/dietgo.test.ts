import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('dietgo', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('dietgo')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 350000, name: 'HMD' },
            { rank: 2, score: 300000, name: 'HMD' },
            { rank: 3, score: 280000, name: 'HMD' },
            { rank: 4, score: 260000, name: 'HMD' },
            { rank: 5, score: 240000, name: 'HMD' },
            { rank: 6, score: 220000, name: 'HMD' },
            { rank: 7, score: 200000, name: 'HMD' },
            { rank: 8, score: 190000, name: 'HMD' },
            { rank: 9, score: 180000, name: 'HMD' },
            { rank: 10, score: 170000, name: 'HMD' },
            { rank: 11, score: 160000, name: 'HMD' },
            { rank: 12, score: 150000, name: 'HMD' },
            { rank: 13, score: 140000, name: 'HMD' },
            { rank: 14, score: 130000, name: 'HMD' },
            { rank: 15, score: 120000, name: 'HMD' },
            { rank: 16, score: 110000, name: 'HMD' },
            { rank: 17, score: 100000, name: 'HMD' },
            { rank: 18, score: 90000, name: 'HMD' },
            { rank: 19, score: 80000, name: 'HMD' },
            { rank: 20, score: 70000, name: 'HMD' },
            { rank: 21, score: 60000, name: 'HMD' },
            { rank: 22, score: 50000, name: 'HMD' },
            { rank: 23, score: 40000, name: 'HMD' },
            { rank: 24, score: 30000, name: 'HMD' },
            { rank: 25, score: 20000, name: 'HMD' },
            { rank: 26, score: 10000, name: 'HMD' },
            { rank: 27, score: 9000, name: 'HMD' },
            { rank: 28, score: 8000, name: 'HMD' },
            { rank: 29, score: 7000, name: 'HMD' },
            { rank: 30, score: 5000, name: 'HMD' },
        ],
    });
});
