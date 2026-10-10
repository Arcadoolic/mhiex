import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('wb3', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('wb3')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 3456780, name: 'AZ9', extra: { round: 18 } },
            { rank: 2, score: 450100, name: 'Z.B', extra: { round: 5 } },
            { rank: 3, score: 30000, name: 'DRA', extra: { round: 0 } },
            { rank: 4, score: 30000, name: 'GON', extra: { round: 0 } },
            { rank: 5, score: 30000, name: 'WB3', extra: { round: 0 } },
        ],
    });
});
