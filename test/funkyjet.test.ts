import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('funkyjet', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('funkyjet')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 1500, name: 'TLF', extra: { stage: '7-5' } },
            { rank: 2, score: 98765, name: 'ZAQ', extra: { stage: '3-4' } },
            { rank: 3, score: 1000, name: 'NAM', extra: { stage: '6-5' } },
            { rank: 4, score: 1000, name: 'YAN', extra: { stage: '5-7' } },
            { rank: 5, score: 700, name: 'YAK', extra: { stage: '4-6' } },
            { rank: 6, score: 500, name: 'YAN', extra: { stage: '3-5' } },
            { rank: 7, score: 400, name: 'YAN', extra: { stage: '2-4' } },
            { rank: 8, score: 300, name: 'SEN', extra: { stage: '1-3' } },
            { rank: 9, score: 200, name: 'AAA', extra: { stage: '1-2' } },
            { rank: 10, score: 100, name: 'AAA', extra: { stage: '1-1' } },
        ],
    });
});
