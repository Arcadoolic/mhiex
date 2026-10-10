import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('grindstm', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('grindstm')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 500000, name: 'TOAPLN', extra: { area: 80 } },
            { rank: 2, score: 450000, name: 'AB 19.', extra: { area: 5 } },
            { rank: 3, score: 400000, name: '------', extra: { area: 0 } },
            { rank: 4, score: 350000, name: '------', extra: { area: 0 } },
            { rank: 5, score: 300000, name: '------', extra: { area: 0 } },
            { rank: 6, score: 250000, name: '------', extra: { area: 0 } },
            { rank: 7, score: 200000, name: '------', extra: { area: 0 } },
            { rank: 8, score: 150000, name: '------', extra: { area: 0 } },
        ],
    });
});
