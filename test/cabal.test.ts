import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('cabal', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('cabal')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987654, name: 'ZAQ', extra: { area: '2-2' } },
            { rank: 2, score: 94800, name: 'THO', extra: { area: '3-1' } },
            { rank: 3, score: 93800, name: 'NDY', extra: { area: '2-4' } },
            { rank: 4, score: 89600, name: 'FTH', extra: { area: '2-3' } },
            { rank: 5, score: 86200, name: 'OND', extra: { area: '2-2' } },
            { rank: 6, score: 76250, name: 'YFT', extra: { area: '2-1' } },
            { rank: 7, score: 59700, name: 'HON', extra: { area: '1-4' } },
            { rank: 8, score: 59400, name: 'DYF', extra: { area: '1-3' } },
            { rank: 9, score: 58400, name: 'THO', extra: { area: '1-2' } },
            { rank: 10, score: 28810, name: 'NIT', extra: { area: '1-1' } },
        ],
    });
});
