import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('gorf', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('gorf')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 20100, name: '' },
            { rank: 2, score: 50403, name: '' },
            { rank: 3, score: 80706, name: '' },
            { rank: 4, score: 111009, name: '' },
            { rank: 5, score: 141312, name: '' },
        ],
        extras: {
            sixShips: [
                { rank: 1, score: 212019, name: '' },
                { rank: 2, score: 242322, name: '' },
                { rank: 3, score: 272625, name: '' },
                { rank: 4, score: 302928, name: '' },
                { rank: 5, score: 333231, name: '' },
            ],
        },
    });
});
