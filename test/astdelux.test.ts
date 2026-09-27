import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('astdelux', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('astdelux')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 1360, name: 'NOB' },
            { rank: 2, score: 0, name: '   ' },
            { rank: 3, score: 0, name: '   ' }
        ]
    })
})
