import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('crimfght', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('crimfght')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 1234, name: 'ZAQ', extra: { stage: 5 } },
            { rank: 2, score: 567, name: 'M.Y', extra: { stage: 1 } },
            { rank: 3, score: 8, name: '*K*', extra: { stage: 1 } },
            { rank: 4, score: 7, name: 'M.I', extra: { stage: 1 } },
            { rank: 5, score: 6, name: 'K.K', extra: { stage: 1 } },
            { rank: 6, score: 5, name: 'SHU', extra: { stage: 1 } },
            { rank: 7, score: 4, name: 'ISI', extra: { stage: 1 } },
            { rank: 8, score: 3, name: 'CHU', extra: { stage: 1 } },
            { rank: 9, score: 2, name: 'H!A', extra: { stage: 1 } },
            { rank: 10, score: 1, name: 'ISI', extra: { stage: 1 } },
        ],
    });
});
