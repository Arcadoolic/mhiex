import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('bloodbro', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('bloodbro')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 9876543, name: 'ZAQ', extra: { area: '2-4' } },
            { rank: 2, score: 19800, name: 'TAD', extra: { area: '1-2' } },
            { rank: 3, score: 19200, name: 'TAD', extra: { area: '1-1' } },
            { rank: 4, score: 12800, name: 'TAD', extra: { area: '1-1' } },
            { rank: 5, score: 8751, name: 'TAD', extra: { area: '1-1' } },
            { rank: 6, score: 8087, name: 'TAD', extra: { area: '1-1' } },
            { rank: 7, score: 8086, name: 'TAD', extra: { area: '1-1' } },
            { rank: 8, score: 8080, name: 'TAD', extra: { area: '1-1' } },
            { rank: 9, score: 6809, name: 'TAD', extra: { area: '1-1' } },
            { rank: 10, score: 6502, name: 'TAD', extra: { area: '1-1' } },
            { rank: 11, score: 6500, name: 'TAD', extra: { area: '1-1' } },
            { rank: 12, score: 6400, name: 'TAD', extra: { area: '1-1' } },
            { rank: 13, score: 6300, name: 'TAD', extra: { area: '1-1' } },
            { rank: 14, score: 6200, name: 'TAD', extra: { area: '1-1' } },
            { rank: 15, score: 6100, name: 'TAD', extra: { area: '1-1' } },
            { rank: 16, score: 6000, name: 'TAD', extra: { area: '1-1' } },
            { rank: 17, score: 5900, name: 'TAD', extra: { area: '1-1' } },
            { rank: 18, score: 5800, name: 'TAD', extra: { area: '1-1' } },
            { rank: 19, score: 5700, name: 'TAD', extra: { area: '1-1' } },
            { rank: 20, score: 5600, name: 'TAD', extra: { area: '1-1' } },
        ],
    });
});
