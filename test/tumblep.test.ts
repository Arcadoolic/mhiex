import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('tumblep', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('tumblep')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 100000, name: 'D&E' },
            { rank: 2, score: 90000, name: 'D&E' },
            { rank: 3, score: 80000, name: 'D&E' },
            { rank: 4, score: 70000, name: 'DEC' },
            { rank: 5, score: 60000, name: 'DC!' },
            { rank: 6, score: 50000, name: '   ' },
            { rank: 7, score: 40000, name: 'DET' },
            { rank: 8, score: 30000, name: 'A.E' },
            { rank: 9, score: 20000, name: 'AST' },
            { rank: 10, score: 10000, name: '.CO' },
            { rank: 11, score: 9500, name: 'RPO' },
            { rank: 12, score: 9000, name: 'RAT' },
            { rank: 13, score: 8500, name: 'ION' },
            { rank: 14, score: 8000, name: '   ' },
            { rank: 15, score: 7500, name: 'D  ' },
            { rank: 16, score: 7000, name: 'E  ' },
            { rank: 17, score: 6500, name: 'C  ' },
            { rank: 18, score: 6000, name: 'O  ' },
            { rank: 19, score: 5500, name: '   ' },
            { rank: 20, score: 5000, name: 'AIN' },
        ],
    });
});
