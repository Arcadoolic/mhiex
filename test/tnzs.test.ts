import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('tnzs', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('tnzs')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 49000, name: 'KAN', extra: { round: '2-2' } },
            { rank: 2, score: 46000, name: 'UYS', extra: { round: '2-1' } },
            { rank: 3, score: 42000, name: 'MAI', extra: { round: '1-4' } },
            { rank: 4, score: 40000, name: 'ABT', extra: { round: '1-4' } },
            { rank: 5, score: 13000, name: 'GUU', extra: { round: '1-3' } },
        ],
    });
});
