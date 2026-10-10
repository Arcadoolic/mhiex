import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('hellfire', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('hellfire')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 50000, name: 'ABZ', extra: { area: '1-20' } },
            { rank: 2, score: 40000, name: '09-', extra: { area: '1-17' } },
            { rank: 3, score: 30000, name: '...', extra: { area: '1-14' } },
            { rank: 4, score: 20000, name: '...', extra: { area: '1-11' } },
            { rank: 5, score: 10000, name: '...', extra: { area: '1-8' } },
        ],
    });
});
