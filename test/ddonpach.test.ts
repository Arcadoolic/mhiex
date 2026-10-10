import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('ddonpach', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('ddonpach')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 5908065, name: 'OSD', extra: { maxHit: 96 } },
            { rank: 2, score: 5544337, name: 'H.S', extra: { maxHit: 96 } },
            { rank: 3, score: 5327080, name: 'OSS', extra: { maxHit: 96 } },
            { rank: 4, score: 4440155, name: 'NAI', extra: { maxHit: 95 } },
            { rank: 5, score: 3562765, name: 'OKS', extra: { maxHit: 95 } },
        ],
    });
});
