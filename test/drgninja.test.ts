import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('drgninja', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('drgninja')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987600, name: 'ZAQ', extra: { level: 5 } },
            { rank: 2, score: 29000, name: 'HEN', extra: { level: 3 } },
            { rank: 3, score: 28000, name: 'IAM', extra: { level: 3 } },
            { rank: 4, score: 26000, name: 'ABO', extra: { level: 3 } },
            { rank: 5, score: 25100, name: 'YEN', extra: { level: 3 } },
            { rank: 6, score: 25000, name: 'AME', extra: { level: 3 } },
            { rank: 7, score: 24900, name: 'FUR', extra: { level: 2 } },
            { rank: 8, score: 23100, name: 'UHI', extra: { level: 2 } },
            { rank: 9, score: 22000, name: 'WAT', extra: { level: 2 } },
            { rank: 10, score: 19000, name: 'ENK', extra: { level: 2 } },
            { rank: 11, score: 18000, name: 'I.G', extra: { level: 2 } },
            { rank: 12, score: 17000, name: 'OMO', extra: { level: 2 } },
            { rank: 13, score: 16000, name: 'I.Q', extra: { level: 2 } },
            { rank: 14, score: 15500, name: '..?', extra: { level: 2 } },
            { rank: 15, score: 15000, name: 'RON', extra: { level: 2 } },
            { rank: 16, score: 13700, name: 'TMO', extra: { level: 2 } },
            { rank: 17, score: 5000, name: 'IKA', extra: { level: 1 } },
            { rank: 18, score: 3000, name: 'SFX', extra: { level: 1 } },
            { rank: 19, score: 2500, name: 'KYO', extra: { level: 1 } },
            { rank: 20, score: 1000, name: 'DWC', extra: { level: 1 } },
        ],
    });
});
