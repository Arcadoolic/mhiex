import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('tturf', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('tturf')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 123456, name: 'A.Z.1.&!', extra: { stage: 2 } },
            { rank: 2, score: 9000, name: 'B C?', extra: { stage: 4 } },
            { rank: 3, score: 8000, name: 'S.E.C.', extra: { stage: 1 } },
            { rank: 4, score: 7000, name: 'S.C.A.', extra: { stage: 1 } },
            { rank: 5, score: 6000, name: 'S.E.C.', extra: { stage: 1 } },
            { rank: 6, score: 5000, name: 'S.C.A.', extra: { stage: 1 } },
            { rank: 7, score: 4000, name: 'S.E.C.', extra: { stage: 1 } },
            { rank: 8, score: 3000, name: 'S.C.A.', extra: { stage: 1 } },
        ],
    });
});
