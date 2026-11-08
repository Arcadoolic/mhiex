import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('commando', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('commando')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ  ...!?' },
            { rank: 2, score: 123450, name: 'SON.SON...' },
            { rank: 3, score: 20000, name: 'HIGEMARU..' },
            { rank: 4, score: 19420, name: 'CAPCOM....' },
            { rank: 5, score: 12000, name: 'EXED.EXES.' },
            { rank: 6, score: 10000, name: 'COMANDO...' },
            { rank: 7, score: 8000, name: '..........' },
        ],
    });
});
