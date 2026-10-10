import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('rastan', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('rastan')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 273100, name: 'COB', extra: { round: 3 } },
            { rank: 2, score: 257200, name: 'THS', extra: { round: 3 } },
            { rank: 3, score: 197800, name: 'YAG', extra: { round: 3 } },
            { rank: 4, score: 125400, name: 'TKG', extra: { round: 2 } },
            { rank: 5, score: 112000, name: 'YTN', extra: { round: 2 } },
        ],
    });
});
