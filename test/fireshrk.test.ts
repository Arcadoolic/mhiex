import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('fireshrk', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('fireshrk')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 70000, name: 'ABZ', extra: { area: '03-02' } },
            { rank: 2, score: 68000, name: '09-', extra: { area: '01-01' } },
            { rank: 3, score: 66000, name: '...', extra: { area: '01-01' } },
            { rank: 4, score: 64000, name: '...', extra: { area: '01-01' } },
            { rank: 5, score: 62000, name: '...', extra: { area: '01-01' } },
            { rank: 6, score: 60000, name: '...', extra: { area: '01-01' } },
            { rank: 7, score: 58000, name: '...', extra: { area: '01-01' } },
            { rank: 8, score: 56000, name: '...', extra: { area: '01-01' } },
            { rank: 9, score: 54000, name: '...', extra: { area: '01-01' } },
            { rank: 10, score: 52000, name: '...', extra: { area: '01-01' } },
            { rank: 11, score: 50000, name: '...', extra: { area: '01-01' } },
            { rank: 12, score: 48000, name: '...', extra: { area: '01-01' } },
            { rank: 13, score: 46000, name: '...', extra: { area: '01-01' } },
            { rank: 14, score: 44000, name: '...', extra: { area: '01-01' } },
            { rank: 15, score: 42000, name: '...', extra: { area: '01-01' } },
            { rank: 16, score: 40000, name: '...', extra: { area: '01-01' } },
            { rank: 17, score: 38000, name: '...', extra: { area: '01-01' } },
            { rank: 18, score: 36000, name: '...', extra: { area: '01-01' } },
            { rank: 19, score: 34000, name: '...', extra: { area: '01-01' } },
            { rank: 20, score: 32000, name: '...', extra: { area: '01-01' } },
        ],
    });
});
