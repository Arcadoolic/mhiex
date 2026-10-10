import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('eswat', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('eswat')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 300000, name: 'ABC', extra: { stage: '1-2' } },
            { rank: 2, score: 280000, name: 'E1 Z', extra: { stage: '3-1' } },
            { rank: 3, score: 260000, name: '...' },
            { rank: 4, score: 240000, name: '...' },
            { rank: 5, score: 220000, name: '...' },
            { rank: 6, score: 200000, name: '...' },
            { rank: 7, score: 180000, name: '...' },
        ],
    });
});
