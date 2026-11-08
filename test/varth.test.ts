import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('varth', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('varth')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 9876540, name: 'ZAQ', extra: { stage: 7 } },
            { rank: 2, score: 123450, name: 'DUK', extra: { stage: 2 } },
            { rank: 3, score: 50000, name: 'HRO', extra: { stage: 2 } },
            { rank: 4, score: 30000, name: 'ATS', extra: { stage: 1 } },
            { rank: 5, score: 10000, name: 'BAT', extra: { stage: 1 } },
            { rank: 6, score: 7000, name: 'NAT', extra: { stage: 1 } },
            { rank: 7, score: 5000, name: 'CAP', extra: { stage: 1 } },
            { rank: 8, score: 3000, name: 'COM', extra: { stage: 1 } },
            { rank: 9, score: 2000, name: 'CAP', extra: { stage: 1 } },
            { rank: 10, score: 1000, name: 'COM', extra: { stage: 1 } },
        ],
    });
});
