import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('rallybik', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('rallybik')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 40000, name: '---', extra: { area: 8 } },
            { rank: 2, score: 39000, name: '---', extra: { area: 8 } },
            { rank: 3, score: 38000, name: '---', extra: { area: 8 } },
            { rank: 4, score: 37000, name: '---', extra: { area: 8 } },
            { rank: 5, score: 36000, name: '---', extra: { area: 8 } },
            { rank: 6, score: 35000, name: '---', extra: { area: 7 } },
            { rank: 7, score: 34000, name: '---', extra: { area: 7 } },
            { rank: 8, score: 33000, name: '---', extra: { area: 7 } },
            { rank: 9, score: 32000, name: '---', extra: { area: 7 } },
            { rank: 10, score: 31000, name: '---', extra: { area: 7 } },
            { rank: 11, score: 30000, name: '---', extra: { area: 5 } },
            { rank: 12, score: 29000, name: '---', extra: { area: 5 } },
            { rank: 13, score: 28000, name: '---', extra: { area: 5 } },
            { rank: 14, score: 27000, name: '---', extra: { area: 5 } },
            { rank: 15, score: 26000, name: '---', extra: { area: 5 } },
            { rank: 16, score: 25000, name: '---', extra: { area: 5 } },
            { rank: 17, score: 24000, name: '---', extra: { area: 4 } },
            { rank: 18, score: 23000, name: '---', extra: { area: 4 } },
            { rank: 19, score: 22000, name: '---', extra: { area: 4 } },
            { rank: 20, score: 21000, name: '---', extra: { area: 4 } },
            { rank: 21, score: 20000, name: '---', extra: { area: 4 } },
            { rank: 22, score: 19000, name: '---', extra: { area: 4 } },
            { rank: 23, score: 18000, name: '---', extra: { area: 2 } },
            { rank: 24, score: 17000, name: '---', extra: { area: 2 } },
            { rank: 25, score: 16000, name: '---', extra: { area: 2 } },
            { rank: 26, score: 15000, name: '---', extra: { area: 2 } },
            { rank: 27, score: 14000, name: '---', extra: { area: 2 } },
            { rank: 28, score: 13000, name: '---', extra: { area: 2 } },
            { rank: 29, score: 12000, name: '---', extra: { area: 1 } },
            { rank: 30, score: 11000, name: 'ABZ', extra: { area: 1 } },
            { rank: 31, score: 10000, name: '09.', extra: { area: 1 } },
            { rank: 32, score: 9000, name: '---', extra: { area: 1 } },
            { rank: 33, score: 8000, name: '---', extra: { area: 1 } },
            { rank: 34, score: 7000, name: '---', extra: { area: 1 } },
            { rank: 35, score: 6000, name: '---', extra: { area: 0 } },
            { rank: 36, score: 5000, name: '---', extra: { area: 0 } },
            { rank: 37, score: 4000, name: '---', extra: { area: 0 } },
            { rank: 38, score: 3000, name: '---', extra: { area: 0 } },
            { rank: 39, score: 2000, name: '---', extra: { area: 0 } },
            { rank: 40, score: 1000, name: '---', extra: { area: 0 } },
        ],
    });
});
