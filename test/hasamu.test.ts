import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('hasamu', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('hasamu')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ.XYZ', extra: { stage: '4-3' } },
            { rank: 2, score: 110, name: 'ROW01', extra: { stage: '1-2' } },
            { rank: 3, score: 120, name: 'ROW02', extra: { stage: '1-3' } },
            { rank: 4, score: 130, name: 'ROW03', extra: { stage: '1-4' } },
            { rank: 5, score: 140, name: 'ROW04', extra: { stage: '1-5' } },
            { rank: 6, score: 150, name: 'ROW05', extra: { stage: '1-1' } },
            { rank: 7, score: 160, name: 'ROW06', extra: { stage: '1-2' } },
            { rank: 8, score: 170, name: 'ROW07', extra: { stage: '1-3' } },
            { rank: 9, score: 180, name: 'ROW08', extra: { stage: '1-4' } },
            { rank: 10, score: 190, name: 'ROW09', extra: { stage: '1-5' } },
            { rank: 11, score: 200, name: 'ROW10', extra: { stage: '1-1' } },
            { rank: 12, score: 210, name: 'ROW11', extra: { stage: '1-2' } },
            { rank: 13, score: 220, name: 'ROW12', extra: { stage: '1-3' } },
            { rank: 14, score: 230, name: 'ROW13', extra: { stage: '1-4' } },
            { rank: 15, score: 240, name: 'ROW14', extra: { stage: '1-5' } },
            { rank: 16, score: 250, name: 'ROW15', extra: { stage: '1-1' } },
            { rank: 17, score: 260, name: 'ROW16', extra: { stage: '1-2' } },
            { rank: 18, score: 270, name: 'ROW17', extra: { stage: '1-3' } },
            { rank: 19, score: 280, name: 'ROW18', extra: { stage: '1-4' } },
            { rank: 20, score: 290, name: 'ROW19', extra: { stage: '1-5' } },
        ],
    });
});
