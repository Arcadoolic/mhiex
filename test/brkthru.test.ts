import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('brkthru', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('brkthru')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 15000, name: 'AME' },
            { rank: 2, score: 12000, name: 'KIT' },
            { rank: 3, score: 10000, name: 'IHU' },
            { rank: 4, score: 9000, name: 'NOK' },
            { rank: 5, score: 8000, name: 'A O' },
        ],
    });
});
