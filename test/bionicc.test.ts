import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('bionicc', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('bionicc')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987654, name: 'ZAQ.' },
            { rank: 2, score: 123456, name: 'COM' },
            { rank: 3, score: 18000, name: 'CAP' },
            { rank: 4, score: 17000, name: 'COM' },
            { rank: 5, score: 16000, name: 'CAP' },
            { rank: 6, score: 15000, name: 'COM' },
            { rank: 7, score: 14000, name: 'CAP' },
            { rank: 8, score: 13000, name: 'COM' },
            { rank: 9, score: 12000, name: 'CAP' },
            { rank: 10, score: 11000, name: 'COM' },
        ],
    });
});
