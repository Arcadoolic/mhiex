import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('flicky', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('flicky')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 10000, name: 'H.I', extra: { round: 3 } },
            { rank: 2, score: 9000, name: 'ICI', extra: { round: 3 } },
            { rank: 3, score: 8000, name: 'Y.K', extra: { round: 3 } },
            { rank: 4, score: 7000, name: 'KTG', extra: { round: 2 } },
            { rank: 5, score: 6000, name: 'M.T', extra: { round: 2 } },
            { rank: 6, score: 5000, name: 'SE ', extra: { round: 2 } },
            { rank: 7, score: 4000, name: ' GA', extra: { round: 1 } },
        ],
    });
});
