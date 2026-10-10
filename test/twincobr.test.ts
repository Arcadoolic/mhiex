import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('twincobr', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('twincobr')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 30000, name: 'ABZ', extra: { area: 10 } },
            { rank: 2, score: 29000, name: '09-', extra: { area: 10 } },
            { rank: 3, score: 28000, name: '---', extra: { area: 9 } },
            { rank: 4, score: 27000, name: '---', extra: { area: 9 } },
            { rank: 5, score: 26000, name: '---', extra: { area: 8 } },
            { rank: 6, score: 25000, name: '---', extra: { area: 8 } },
            { rank: 7, score: 24000, name: '---', extra: { area: 7 } },
            { rank: 8, score: 23000, name: '---', extra: { area: 7 } },
            { rank: 9, score: 22000, name: '---', extra: { area: 6 } },
            { rank: 10, score: 21000, name: '---', extra: { area: 6 } },
            { rank: 11, score: 20000, name: '---', extra: { area: 5 } },
            { rank: 12, score: 19000, name: '---', extra: { area: 5 } },
            { rank: 13, score: 18000, name: '---', extra: { area: 4 } },
            { rank: 14, score: 17000, name: '---', extra: { area: 4 } },
            { rank: 15, score: 16000, name: '---', extra: { area: 3 } },
            { rank: 16, score: 15000, name: '---', extra: { area: 3 } },
            { rank: 17, score: 14000, name: '---', extra: { area: 2 } },
            { rank: 18, score: 13000, name: '---', extra: { area: 2 } },
            { rank: 19, score: 12000, name: '---', extra: { area: 1 } },
            { rank: 20, score: 11000, name: '---', extra: { area: 1 } },
        ],
    });
});
