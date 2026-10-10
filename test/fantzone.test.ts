import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('fantzone', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('fantzone')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 12000, name: 'ISI', extra: { round: 2 } },
            { rank: 2, score: 10000, name: 'KTG', extra: { round: 2 } },
            { rank: 3, score: 8000, name: 'HKR', extra: { round: 2 } },
            { rank: 4, score: 6000, name: 'YKT', extra: { round: 1 } },
            { rank: 5, score: 4000, name: 'KBY', extra: { round: 1 } },
            { rank: 6, score: 2000, name: 'KND', extra: { round: 1 } },
            { rank: 7, score: 1000, name: 'IKR', extra: { round: 1 } },
        ],
    });
});
