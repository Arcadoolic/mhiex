import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('nitd', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('nitd')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 278500, name: 'RAF ' },
            { rank: 2, score: 266900, name: 'RAF ' },
            { rank: 3, score: 178000, name: 'RAF ' },
            { rank: 4, score: 10000, name: 'YOKO' },
            { rank: 5, score: 9000, name: 'TAKE' },
        ]
    })
})
