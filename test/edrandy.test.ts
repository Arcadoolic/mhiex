import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('edrandy', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('edrandy')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 530951, name: 'MIY' },
            { rank: 2, score: 389702, name: 'SEI' },
            { rank: 3, score: 232146, name: 'MIT' },
            { rank: 4, score: 174056, name: 'AAA' },
            { rank: 5, score: 113674, name: 'HID' },
            { rank: 6, score: 78839, name: 'HID' },
            { rank: 7, score: 50067, name: 'YUK' },
            { rank: 8, score: 33874, name: 'AAA' },
            { rank: 9, score: 26420, name: 'KAT' },
            { rank: 10, score: 13271, name: 'MAN' },
            { rank: 11, score: 10003, name: 'KUN' },
            { rank: 12, score: 5548, name: 'AAA' },
            { rank: 13, score: 4711, name: 'SHI' },
            { rank: 14, score: 4423, name: 'KYO' },
            { rank: 15, score: 3908, name: 'KAY' },
        ],
    });
});
