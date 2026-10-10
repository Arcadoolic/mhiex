import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('robocop2', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('robocop2')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 10000, name: 'NII' },
            { rank: 2, score: 9000, name: 'OSN' },
            { rank: 3, score: 8000, name: 'MHO' },
            { rank: 4, score: 7000, name: 'UIU' },
            { rank: 5, score: 6000, name: 'RKE' },
            { rank: 6, score: 5000, name: 'AA.' },
            { rank: 7, score: 4000, name: 'AWT' },
            { rank: 8, score: 3000, name: '&MI' },
            { rank: 9, score: 2000, name: 'CHI' },
            { rank: 10, score: 1000, name: 'HO!' },
        ],
    });
});
