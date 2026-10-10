import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('zerowing', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('zerowing')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 50000, name: 'ABZ', extra: { area: '6-20' } },
            { rank: 2, score: 48000, name: '09.', extra: { area: '5-19' } },
            { rank: 3, score: 46000, name: '...', extra: { area: '4-18' } },
            { rank: 4, score: 44000, name: '...', extra: { area: '3-17' } },
            { rank: 5, score: 42000, name: '...', extra: { area: '2-16' } },
        ],
    });
});
