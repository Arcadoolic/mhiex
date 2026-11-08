import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('tdragon', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('tdragon')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987654, name: 'ZAQXYBCD', extra: { stage: 7 } },
            { rank: 2, score: 2940, name: 'AKARINGO', extra: { stage: 1 } },
            { rank: 3, score: 2390, name: 'REKINDLE', extra: { stage: 1 } },
            { rank: 4, score: 2020, name: 'UZAZAZA', extra: { stage: 1 } },
            { rank: 5, score: 1780, name: 'CUMBRIA?', extra: { stage: 1 } },
            { rank: 6, score: 1130, name: 'HKENJI', extra: { stage: 1 } },
            { rank: 7, score: 1070, name: 'AEKOTO', extra: { stage: 1 } },
            { rank: 8, score: 850, name: 'NNA+&YJJ', extra: { stage: 1 } },
            { rank: 9, score: 380, name: 'DCTIMER', extra: { stage: 1 } },
            { rank: 10, score: 170, name: 'AHSU@:', extra: { stage: 1 } },
            { rank: 11, score: 40, name: 'YAUHITSU', extra: { stage: 1 } },
            { rank: 12, score: 6, name: 'ONO', extra: { stage: 1 } },
        ],
    });
});
