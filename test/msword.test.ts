import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('msword', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('msword')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 9876540, name: 'ZAQ', extra: { floor: 30 } },
            { rank: 2, score: 450000, name: 'YAN', extra: { floor: 11 } },
            { rank: 3, score: 400000, name: 'HAC', extra: { floor: 10 } },
            { rank: 4, score: 350000, name: 'GYO', extra: { floor: 9 } },
            { rank: 5, score: 300000, name: 'HOS', extra: { floor: 8 } },
            { rank: 6, score: 250000, name: 'CAP', extra: { floor: 7 } },
            { rank: 7, score: 200000, name: 'COM', extra: { floor: 6 } },
            { rank: 8, score: 200000, name: 'CAP', extra: { floor: 5 } },
            { rank: 9, score: 200000, name: 'COM', extra: { floor: 4 } },
            { rank: 10, score: 200000, name: 'CAP', extra: { floor: 4 } },
        ],
    });
});
