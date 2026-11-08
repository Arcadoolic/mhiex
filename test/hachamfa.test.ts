import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('hachamfa', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('hachamfa')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 1098765, name: 'ZAQ', extra: { stage: 4 } },
            { rank: 2, score: 1012900, name: 'OOA', extra: { stage: 1 } },
            { rank: 3, score: 1012390, name: 'UNN', extra: { stage: 1 } },
            { rank: 4, score: 1012080, name: 'MKA', extra: { stage: 1 } },
            { rank: 5, score: 1010770, name: 'IIT', extra: { stage: 1 } },
            { rank: 6, score: 1009160, name: 'CCA', extra: { stage: 1 } },
            { rank: 7, score: 1007050, name: 'HHR', extra: { stage: 1 } },
            { rank: 8, score: 1005840, name: 'AIO', extra: { stage: 1 } },
            { rank: 9, score: 1003430, name: 'ADO', extra: { stage: 1 } },
            { rank: 10, score: 1002620, name: 'NAU', extra: { stage: 1 } },
        ],
    });
});
