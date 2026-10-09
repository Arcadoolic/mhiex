import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// A game quit before its end: the top score (13030) is not in the ranking yet.
it('scobra', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('scobra')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 13030, name: '' },
            ...Array.from({ length: 9 }, (_, i) => ({ rank: i + 2, score: 10000, name: '' })),
        ],
    });
});
