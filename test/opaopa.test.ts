import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('opaopa', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('opaopa')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 60000, name: 'FKK' },
            { rank: 2, score: 55000, name: 'LLH' },
            { rank: 3, score: 50010, name: 'MMO' },
            { rank: 4, score: 45060, name: 'NBN' },
            { rank: 5, score: 40070, name: 'AOO' },
            { rank: 6, score: 38000, name: 'PPP' },
            { rank: 7, score: 36090, name: 'Z.$' },
            { rank: 8, score: 34020, name: '089' },
        ],
    });
});
