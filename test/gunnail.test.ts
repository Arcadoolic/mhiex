import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('gunnail', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('gunnail')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987654, name: 'ZAQ', extra: { stage: 5 } },
            { rank: 2, score: 1789, name: 'AOA', extra: { stage: 1 } },
            { rank: 3, score: 1191, name: 'NRR', extra: { stage: 1 } },
            { rank: 4, score: 618, name: 'CIA', extra: { stage: 1 } },
            { rank: 5, score: 119, name: 'HOS', extra: { stage: 1 } },
            { rank: 6, score: 32, name: 'ADH', extra: { stage: 1 } },
            { rank: 7, score: 3, name: 'NAI', extra: { stage: 1 } },
        ],
    });
});
