import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('bwidow', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('bwidow')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 98765, name: 'ZAQ', extra: { wave: 23 } },
            { rank: 2, score: 0, name: '   ', extra: { wave: 0 } },
            { rank: 3, score: 0, name: '   ', extra: { wave: 0 } },
            { rank: 4, score: 10801, name: '***', extra: { wave: 11 } },
            { rank: 5, score: 10101, name: 'BDM', extra: { wave: 11 } },
            { rank: 6, score: 10101, name: 'REO', extra: { wave: 11 } },
            { rank: 7, score: 10101, name: 'UNR', extra: { wave: 11 } },
            { rank: 8, score: 10101, name: 'CNG', extra: { wave: 11 } },
            { rank: 9, score: 10101, name: 'EIA', extra: { wave: 11 } },
            { rank: 10, score: 10101, name: '*SN', extra: { wave: 11 } },
            { rank: 11, score: 10101, name: 'B*W', extra: { wave: 11 } },
            { rank: 12, score: 10101, name: 'L*I', extra: { wave: 11 } },
            { rank: 13, score: 10101, name: 'A*D', extra: { wave: 11 } },
            { rank: 14, score: 10101, name: 'C*O', extra: { wave: 11 } },
            { rank: 15, score: 10101, name: 'K*W', extra: { wave: 11 } },
            { rank: 16, score: 10101, name: 'A*G', extra: { wave: 11 } },
            { rank: 17, score: 10101, name: 'T*A', extra: { wave: 11 } },
            { rank: 18, score: 10101, name: 'A*M', extra: { wave: 11 } },
            { rank: 19, score: 10101, name: 'R*E', extra: { wave: 11 } },
            { rank: 20, score: 10101, name: 'I*S', extra: { wave: 11 } },
        ],
    });
});
