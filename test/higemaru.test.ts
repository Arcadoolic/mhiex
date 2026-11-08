import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('higemaru', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('higemaru')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'Z.AQ......' },
            { rank: 2, score: 20000, name: 'T.ARIMA...' },
            { rank: 3, score: 20000, name: 'T.HARA....' },
            { rank: 4, score: 10000, name: 'Y.MAKI....' },
            { rank: 5, score: 10000, name: 'A.MORI....' },
            { rank: 6, score: 10000, name: 'T.KAWAMOTO' },
            { rank: 7, score: 10000, name: 'K.KAMIMORI' },
            { rank: 8, score: 10000, name: 'H.FUJINAKA' },
            { rank: 9, score: 10000, name: 'Y.OKAMOTO.' },
            { rank: 10, score: 10000, name: 'R.MIYAMOTO' },
        ],
    });
});
