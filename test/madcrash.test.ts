import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('madcrash', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('madcrash')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987654, name: 'ZAQ' },
            { rank: 2, score: 10000, name: 'SNK' },
            { rank: 3, score: 10000, name: 'SNK' },
            { rank: 4, score: 10000, name: 'SNK' },
            { rank: 5, score: 10000, name: 'SNK' },
        ],
    });
});
