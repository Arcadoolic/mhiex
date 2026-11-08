import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('heatbrl', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('heatbrl')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 123456, name: 'ZAQ', extra: { stage: 3 } },
            { rank: 2, score: 90, name: 'SAD', extra: { stage: 5 } },
            { rank: 3, score: 80, name: 'HAS', extra: { stage: 4 } },
            { rank: 4, score: 70, name: 'SHI', extra: { stage: 4 } },
            { rank: 5, score: 60, name: 'KAW', extra: { stage: 3 } },
            { rank: 6, score: 50, name: 'NOD', extra: { stage: 3 } },
            { rank: 7, score: 40, name: 'KUR', extra: { stage: 2 } },
            { rank: 8, score: 30, name: 'AOK', extra: { stage: 2 } },
            { rank: 9, score: 20, name: 'GLF', extra: { stage: 1 } },
            { rank: 10, score: 10, name: 'SKY', extra: { stage: 1 } },
        ],
    });
});
