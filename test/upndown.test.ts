import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('upndown', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('upndown')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 10000, name: 'ICI' },
            { rank: 2, score: 9000, name: 'T.N' },
            { rank: 3, score: 8000, name: 'SHO' },
            { rank: 4, score: 7000, name: 'R.T' },
            { rank: 5, score: 6000, name: 'H.N' },
            { rank: 6, score: 5000, name: 'TAK' },
            { rank: 7, score: 4000, name: 'H.K' },
            { rank: 8, score: 3000, name: 'STO' },
            { rank: 9, score: 2000, name: 'MI.' },
            { rank: 10, score: 1000, name: 'KIP' },
        ],
    });
});
