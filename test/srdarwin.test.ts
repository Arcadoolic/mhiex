import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('srdarwin', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('srdarwin')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 57800, name: 'SAT' },
            { rank: 2, score: 43900, name: 'OSI' },
            { rank: 3, score: 32900, name: 'SIN' },
            { rank: 4, score: 23700, name: 'GO ' },
            { rank: 5, score: 18700, name: 'KEI' },
            { rank: 6, score: 15500, name: 'ICH' },
            { rank: 7, score: 12600, name: 'KOU' },
            { rank: 8, score: 9800, name: 'IIG' },
            { rank: 9, score: 8400, name: 'KAT' },
            { rank: 10, score: 8200, name: 'YAM' },
        ],
    });
});
