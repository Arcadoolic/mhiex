import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('bnzabros', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('bnzabros')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 12345678, name: 'ABC', extra: { stage: 25 } },
            { rank: 2, score: 280200, name: 'Z.9', extra: { stage: 12 } },
            { rank: 3, score: 243100, name: 'SAI', extra: { stage: 8 } },
            { rank: 4, score: 182000, name: 'KUS', extra: { stage: 7 } },
            { rank: 5, score: 181100, name: 'HID', extra: { stage: 6 } },
            { rank: 6, score: 122200, name: 'NAM', extra: { stage: 5 } },
            { rank: 7, score: 98000, name: 'AOK', extra: { stage: 4 } },
            { rank: 8, score: 41200, name: 'KAN', extra: { stage: 3 } },
            { rank: 9, score: 23600, name: 'KAO', extra: { stage: 2 } },
            { rank: 10, score: 13100, name: 'YAM', extra: { stage: 1 } },
        ],
    });
});
