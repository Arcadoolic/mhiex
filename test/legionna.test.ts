import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('legionna', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('legionna')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 9876543, name: 'ZAQ', extra: { stage: 4 } },
            { rank: 2, score: 24300, name: 'NIS', extra: { stage: 2 } },
            { rank: 3, score: 22390, name: 'FUJ', extra: { stage: 1 } },
            { rank: 4, score: 10600, name: 'IMA', extra: { stage: 1 } },
            { rank: 5, score: 1, name: 'TAD', extra: { stage: 0 } },
        ],
    });
});
