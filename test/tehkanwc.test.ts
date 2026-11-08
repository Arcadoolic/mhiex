import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('tehkanwc', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('tehkanwc')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 6, name: 'ZAQ', extra: { result: '3:2' } },
            { rank: 2, score: 4, name: 'TOM', extra: { result: '0:0' } },
            { rank: 3, score: 4, name: 'TSU', extra: { result: '0:0' } },
            { rank: 4, score: 4, name: 'RIE', extra: { result: '0:0' } },
            { rank: 5, score: 3, name: 'MOR', extra: { result: '0:0' } },
            { rank: 6, score: 3, name: 'YOK', extra: { result: '0:0' } },
            { rank: 7, score: 3, name: 'YOS', extra: { result: '0:0' } },
            { rank: 8, score: 3, name: 'ONU', extra: { result: '0:0' } },
            { rank: 9, score: 2, name: 'BOO', extra: { result: '0:0' } },
            { rank: 10, score: 2, name: 'AKE', extra: { result: '0:0' } },
            { rank: 11, score: 2, name: 'TUR', extra: { result: '0:0' } },
            { rank: 12, score: 2, name: 'HAJ', extra: { result: '0:0' } },
        ],
    });
});
