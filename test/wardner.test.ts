import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('wardner', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('wardner')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 20000, name: 'AHZ', extra: { area: 5 } },
            { rank: 2, score: 18000, name: 'TOAPL', extra: { area: 5 } },
            { rank: 3, score: 16000, name: 'CCC', extra: { area: 5 } },
            { rank: 4, score: 14000, name: 'DDD', extra: { area: 4 } },
            { rank: 5, score: 12000, name: 'EEE', extra: { area: 4 } },
            { rank: 6, score: 10000, name: 'FFF', extra: { area: 4 } },
            { rank: 7, score: 8000, name: 'GGG', extra: { area: 3 } },
            { rank: 8, score: 6000, name: 'HHH', extra: { area: 3 } },
            { rank: 9, score: 4000, name: 'III', extra: { area: 2 } },
            { rank: 10, score: 2000, name: 'JJJ', extra: { area: 2 } },
        ],
    });
});
