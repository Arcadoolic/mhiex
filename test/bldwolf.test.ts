import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('bldwolf', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('bldwolf')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 100000, name: 'AKI', extra: { stage: 8 } },
            { rank: 2, score: 90000, name: 'ZEN', extra: { stage: 7 } },
            { rank: 3, score: 80000, name: 'UMO', extra: { stage: 6 } },
            { rank: 4, score: 70000, name: 'MAK', extra: { stage: 5 } },
            { rank: 5, score: 60000, name: 'E.E', extra: { stage: 4 } },
            { rank: 6, score: 50000, name: 'RGB', extra: { stage: 3 } },
            { rank: 7, score: 40000, name: '*01', extra: { stage: 2 } },
            { rank: 8, score: 30000, name: 'DES', extra: { stage: 2 } },
            { rank: 9, score: 20000, name: 'JUN', extra: { stage: 1 } },
            { rank: 10, score: 10000, name: 'E.T', extra: { stage: 1 } },
        ],
    });
});
