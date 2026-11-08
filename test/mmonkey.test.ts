import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('mmonkey', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('mmonkey')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'Z.A' },
            { rank: 2, score: 12340, name: 'Q.Y' },
            { rank: 3, score: 15000, name: 'T.K' },
            { rank: 4, score: 10000, name: 'T.H' },
            { rank: 5, score: 7000, name: 'M.O' },
        ],
    });
});
