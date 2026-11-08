import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('metrocrs', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('metrocrs')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 1234567, name: 'ZAQ', extra: { round: 9 } },
            { rank: 2, score: 64000, name: 'PARSLEY', extra: { round: 4 } },
            { rank: 3, score: 51200, name: 'LETTUCE', extra: { round: 3 } },
            { rank: 4, score: 38400, name: 'SPINACH', extra: { round: 2 } },
            { rank: 5, score: 25600, name: 'CABBAGE', extra: { round: 1 } },
        ],
    });
});
