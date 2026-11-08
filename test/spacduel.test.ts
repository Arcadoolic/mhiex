import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('spacduel', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('spacduel')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 15000, name: '' },
            { rank: 2, score: 5634120, name: 'ZAQ' },
            { rank: 3, score: 17000, name: 'SRC' },
            { rank: 4, score: 18000, name: 'DES' },
            { rank: 5, score: 19000, name: 'JMR' },
        ],
        extras: {
            twoPlayers: [
                { rank: 1, score: 10000, name: '' },
                { rank: 2, score: 11000, name: 'XYZ' },
                { rank: 3, score: 12000, name: 'SRC' },
                { rank: 4, score: 13000, name: 'DES' },
                { rank: 5, score: 14000, name: 'JMR' },
            ],
        },
    });
});
