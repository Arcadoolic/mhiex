import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('headon2', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('headon2')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 123456, name: '' },
            { rank: 2, score: 789012, name: '' },
            { rank: 3, score: 345678, name: '' },
        ],
    });
});
