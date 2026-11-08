import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('tdragon2', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('tdragon2')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 12345, name: 'ZAQ' },
            { rank: 2, score: 17000, name: 'IMI' },
            { rank: 3, score: 16000, name: 'MIX' },
            { rank: 4, score: 15000, name: 'WAG' },
            { rank: 5, score: 14000, name: 'ALG' },
            { rank: 6, score: 13000, name: 'EEJ' },
            { rank: 7, score: 12000, name: 'ANA' },
            { rank: 8, score: 11000, name: 'ITT' },
            { rank: 9, score: 10000, name: 'EBA' },
        ],
    });
});
