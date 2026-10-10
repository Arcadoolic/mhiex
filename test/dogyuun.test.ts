import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('dogyuun', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('dogyuun')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 370000, name: 'TOA', extra: { stage: '6-9' } },
            { rank: 2, score: 340000, name: 'DDD', extra: { stage: '6-3' } },
            { rank: 3, score: 310000, name: 'OOO', extra: { stage: '6-1' } },
            { rank: 4, score: 280000, name: 'GGG', extra: { stage: '5-8' } },
            { rank: 5, score: 250000, name: 'YYY', extra: { stage: '5-5' } },
            { rank: 6, score: 220000, name: 'UUU', extra: { stage: '4-7' } },
            { rank: 7, score: 190000, name: 'UUU', extra: { stage: '4-5' } },
            { rank: 8, score: 160000, name: 'NNN', extra: { stage: '4-1' } },
            { rank: 9, score: 130000, name: '!!!', extra: { stage: '3-7' } },
            { rank: 10, score: 100000, name: '!!!', extra: { stage: '3-4' } },
        ],
    });
});
