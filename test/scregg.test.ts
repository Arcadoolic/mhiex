import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('scregg', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('scregg')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'Z.A' },
            { rank: 2, score: 17650, name: 'QXY' },
            { rank: 3, score: 18300, name: 'J.H' },
            { rank: 4, score: 10000, name: 'H.S' },
            { rank: 5, score: 4700, name: 'K.T' },
        ],
    });
});
