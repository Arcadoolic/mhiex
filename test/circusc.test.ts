import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('circusc', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('circusc')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 98760, name: 'ZAQ', extra: { stage: 9 } },
            { rank: 2, score: 12340, name: 'CBX', extra: { stage: 2 } },
            { rank: 3, score: 10900, name: 'GPZ', extra: { stage: 2 } },
            { rank: 4, score: 9900, name: 'GSX', extra: { stage: 1 } },
            { rank: 5, score: 9200, name: 'RGF', extra: { stage: 1 } },
            { rank: 6, score: 8900, name: 'XJZ', extra: { stage: 1 } },
            { rank: 7, score: 7900, name: 'RZR', extra: { stage: 1 } },
        ],
    });
});
