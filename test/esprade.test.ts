import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('esprade', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('esprade')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 3000000, name: 'AER', extra: { stage: 5 } },
            { rank: 2, score: 2500001, name: 'YUE', extra: { stage: 4 } },
            { rank: 3, score: 2000002, name: 'NOK', extra: { stage: 3 } },
            { rank: 4, score: 1500003, name: 'UNO', extra: { stage: 2 } },
            { rank: 5, score: 1000004, name: 'JIJ', extra: { stage: 1 } },
        ],
    });
});
