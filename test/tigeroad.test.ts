import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('tigeroad', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('tigeroad')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'MASATUGU' },
            { rank: 2, score: 30000, name: 'KYOKO.' },
            { rank: 3, score: 25000, name: 'YUKIO.' },
            { rank: 4, score: 20000, name: 'CAPCOM' },
            { rank: 5, score: 15000, name: 'CAPCOM' },
        ],
    });
});
