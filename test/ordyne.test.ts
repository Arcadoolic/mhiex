import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('ordyne', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('ordyne')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ', extra: { round: 11 } },
            { rank: 2, score: 40000, name: 'BBB', extra: { round: 6 } },
            { rank: 3, score: 20000, name: 'CCC', extra: { round: 5 } },
            { rank: 4, score: 10000, name: 'DDD', extra: { round: 4 } },
            { rank: 5, score: 5000, name: 'EEE', extra: { round: 3 } },
        ],
    });
});
