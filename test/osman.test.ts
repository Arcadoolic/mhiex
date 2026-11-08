import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('osman', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('osman')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 9876543, name: 'Z.Q' },
            { rank: 2, score: 40000, name: 'UTT' },
            { rank: 3, score: 35000, name: 'M.Y' },
            { rank: 4, score: 30000, name: 'Y.O' },
            { rank: 5, score: 25000, name: 'K.K' },
            { rank: 6, score: 20000, name: '...' },
            { rank: 7, score: 15000, name: '...' },
            { rank: 8, score: 10000, name: '...' },
            { rank: 9, score: 5000, name: '...' },
            { rank: 10, score: 1000, name: '...' },
        ],
    });
});
