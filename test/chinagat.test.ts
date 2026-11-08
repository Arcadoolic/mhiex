import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('chinagat', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('chinagat')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ' },
            { rank: 2, score: 123450, name: 'UAO' },
            { rank: 3, score: 8000, name: 'LRN' },
            { rank: 4, score: 6000, name: 'ICT' },
            { rank: 5, score: 4000, name: 'PHA' },
        ],
    });
});
