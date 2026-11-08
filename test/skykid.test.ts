import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('skykid', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('skykid')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ', extra: { medals: 7 } },
            { rank: 2, score: 25000, name: 'YOSIMOTO', extra: { medals: 4 } },
            { rank: 3, score: 20000, name: 'KAWAI', extra: { medals: 3 } },
            { rank: 4, score: 15000, name: 'MORIKAWA', extra: { medals: 2 } },
            { rank: 5, score: 10000, name: 'NAKAYAMA', extra: { medals: 1 } },
        ],
    });
});
