import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('pbaction', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('pbaction')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 95270, name: 'HAJ' },
            { rank: 2, score: 91540, name: 'BOO' },
            { rank: 3, score: 89710, name: 'H.Y' },
            { rank: 4, score: 86970, name: 'MAR' },
            { rank: 5, score: 85480, name: 'K.O' },
            { rank: 6, score: 83530, name: 'R.Y' },
            { rank: 7, score: 76810, name: 'T.M' },
            { rank: 8, score: 76670, name: 'NOB' },
            { rank: 9, score: 75590, name: 'BON' },
            { rank: 10, score: 68410, name: 'K.K' }
        ]
    })
})
