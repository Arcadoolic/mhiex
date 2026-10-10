import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('ddp3', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('ddp3')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 7296714, name: 'YDX', extra: { stage: 4, maxHit: 57 } },
            { rank: 2, score: 7280945, name: 'WTN', extra: { stage: 4, maxHit: 53 } },
            { rank: 3, score: 7193547, name: 'NAI', extra: { stage: 3, maxHit: 24 } },
            { rank: 4, score: 7044683, name: 'NAL', extra: { stage: 3, maxHit: 44 } },
            { rank: 5, score: 6943522, name: 'HAT', extra: { stage: 2, maxHit: 38 } },
        ],
    });
});
