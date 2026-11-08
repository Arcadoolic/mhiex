import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('gaplus', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('gaplus')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ', extra: { age: '99', blood: 'AB' } },
            { rank: 2, score: 12345, name: 'GAPLUS', extra: { age: '21', blood: 'O' } },
            { rank: 3, score: 50000, name: 'GAPLUS', extra: { age: '22', blood: 'B' } },
            { rank: 4, score: 50000, name: 'GAPLUS', extra: { age: '23', blood: 'A' } },
            { rank: 5, score: 50000, name: 'GAPLUS', extra: { age: '24', blood: 'AB' } },
        ],
    });
});
