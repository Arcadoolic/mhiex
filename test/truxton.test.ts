import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('truxton', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('truxton')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 50000, name: '...', extra: { area: 20 } },
            { rank: 2, score: 48000, name: '...', extra: { area: 20 } },
            { rank: 3, score: 46000, name: '...', extra: { area: 19 } },
            { rank: 4, score: 44000, name: '...', extra: { area: 19 } },
            { rank: 5, score: 42000, name: '...', extra: { area: 18 } },
            { rank: 6, score: 40000, name: 'ABZ', extra: { area: 18 } },
            { rank: 7, score: 38000, name: '09-', extra: { area: 17 } },
            { rank: 8, score: 36000, name: '...', extra: { area: 17 } },
            { rank: 9, score: 34000, name: '...', extra: { area: 16 } },
            { rank: 10, score: 32000, name: '...', extra: { area: 16 } },
            { rank: 11, score: 30000, name: '...', extra: { area: 15 } },
            { rank: 12, score: 28000, name: '...', extra: { area: 15 } },
            { rank: 13, score: 26000, name: '...', extra: { area: 14 } },
            { rank: 14, score: 24000, name: '...', extra: { area: 14 } },
            { rank: 15, score: 22000, name: '...', extra: { area: 13 } },
            { rank: 16, score: 20000, name: '...', extra: { area: 13 } },
            { rank: 17, score: 18000, name: '...', extra: { area: 12 } },
            { rank: 18, score: 16000, name: '...', extra: { area: 12 } },
            { rank: 19, score: 14000, name: '...', extra: { area: 11 } },
            { rank: 20, score: 12000, name: '...', extra: { area: 11 } },
        ],
    });
});
