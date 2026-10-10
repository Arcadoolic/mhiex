import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('tigerh', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('tigerh')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 20000, name: 'SHI', extra: { area: 5 } },
            { rank: 2, score: 18000, name: 'NJU', extra: { area: 5 } },
            { rank: 3, score: 16000, name: 'KUK', extra: { area: 5 } },
            { rank: 4, score: 14000, name: 'USH', extra: { area: 4 } },
            { rank: 5, score: 12000, name: 'INJ', extra: { area: 4 } },
            { rank: 6, score: 10000, name: 'UKU', extra: { area: 4 } },
            { rank: 7, score: 8000, name: 'SAN', extra: { area: 3 } },
            { rank: 8, score: 6000, name: 'CHO', extra: { area: 3 } },
            { rank: 9, score: 4000, name: 'UME', extra: { area: 2 } },
            { rank: 10, score: 2000, name: 'TOA', extra: { area: 2 } },
        ],
    });
});
