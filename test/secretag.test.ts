import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('secretag', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('secretag')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987654, name: 'ZAQ' },
            { rank: 2, score: 285000, name: '110' },
            { rank: 3, score: 270000, name: '119' },
            { rank: 4, score: 255000, name: '117' },
            { rank: 5, score: 240000, name: '177' },
            { rank: 6, score: 220000, name: '813' },
            { rank: 7, score: 200000, name: '893' },
            { rank: 8, score: 190000, name: '999' },
            { rank: 9, score: 180000, name: '991' },
            { rank: 10, score: 170000, name: '123' },
            { rank: 11, score: 150000, name: '234' },
            { rank: 12, score: 142000, name: '345' },
            { rank: 13, score: 138000, name: '456' },
            { rank: 14, score: 125000, name: '567' },
            { rank: 15, score: 110000, name: '678' },
            { rank: 16, score: 98000, name: '789' },
            { rank: 17, score: 80000, name: '666' },
            { rank: 18, score: 75000, name: '001' },
            { rank: 19, score: 60000, name: '002' },
            { rank: 20, score: 50000, name: '003' },
        ],
    });
});
