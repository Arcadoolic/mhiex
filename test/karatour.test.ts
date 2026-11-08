import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('karatour', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('karatour')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 7456500, name: 'ZAQ', extra: { beaten: 10 } },
            { rank: 2, score: 8000, name: 'Y.H', extra: { beaten: 8 } },
            { rank: 3, score: 6000, name: 'POC', extra: { beaten: 7 } },
            { rank: 4, score: 4000, name: 'PEN', extra: { beaten: 6 } },
            { rank: 5, score: 2000, name: 'NAM', extra: { beaten: 5 } },
            { rank: 6, score: 1000, name: 'CHU', extra: { beaten: 4 } },
            { rank: 7, score: 500, name: 'NLI', extra: { beaten: 3 } },
            { rank: 8, score: 100, name: 'ASM', extra: { beaten: 2 } },
        ],
        extras: {
            brown: [
                { rank: 1, score: 1234500, name: 'XYZ', extra: { beaten: 5 } },
                { rank: 2, score: 8000, name: 'LHR', extra: { beaten: 7 } },
                { rank: 3, score: 6000, name: 'KAN', extra: { beaten: 6 } },
                { rank: 4, score: 4000, name: 'EDA', extra: { beaten: 5 } },
                { rank: 5, score: 2000, name: 'SYO', extra: { beaten: 4 } },
                { rank: 6, score: 1000, name: 'RYU', extra: { beaten: 3 } },
                { rank: 7, score: 500, name: 'KEN', extra: { beaten: 2 } },
                { rank: 8, score: 100, name: 'LNK', extra: { beaten: 1 } },
            ],
            white: [
                { rank: 1, score: 700, name: 'Q.Q', extra: { beaten: 4 } },
                { rank: 2, score: 8000, name: 'ARA', extra: { beaten: 6 } },
                { rank: 3, score: 6000, name: 'H.H', extra: { beaten: 5 } },
                { rank: 4, score: 4000, name: 'TLF', extra: { beaten: 4 } },
                { rank: 5, score: 2000, name: 'STA', extra: { beaten: 3 } },
                { rank: 6, score: 1000, name: 'BEG', extra: { beaten: 2 } },
                { rank: 7, score: 500, name: 'BIS', extra: { beaten: 1 } },
                { rank: 8, score: 100, name: 'COM', extra: { beaten: 0 } },
            ],
        },
    });
});
