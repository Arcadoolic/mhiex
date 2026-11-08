import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('gpilots', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('gpilots')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987600, name: 'ZAQ' },
            { rank: 2, score: 29000, name: 'SNK' },
            { rank: 3, score: 28000, name: 'SNK' },
            { rank: 4, score: 27000, name: 'SNK' },
            { rank: 5, score: 26000, name: 'SNK' },
            { rank: 6, score: 25000, name: 'SNK' },
            { rank: 7, score: 24000, name: 'SNK' },
            { rank: 8, score: 23000, name: 'SNK' },
            { rank: 9, score: 22000, name: 'SNK' },
        ],
    });
});
