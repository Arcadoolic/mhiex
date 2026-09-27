import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 8 entries stored from the lowest (rank 8) to the best, in separate arrays of 8 bytes: score low,
// middle and high bytes (hex digits), then first, second and third letters (A = 1). Checked against
// the game's FLUNKY LIST screen (MAME 0.289).
@Extractor({
    name: 'gravitar'
})
export default class Gravitar extends AbstractExtractor {
    extract(): this {
        const hi = this.hi!.buffer;
        for (let rank = 1; rank <= 8; rank++) {
            const i = 8 - rank;
            this.output.default.push({
                rank,
                score: parseInt(Buffer.from([hi[16 + i], hi[8 + i], hi[i]]).toString('hex')),
                name: [24, 32, 40]
                    .map(o => hi[o + i] ? String.fromCharCode(hi[o + i] + 64) : ' ').join('').trim()
            });
        }
        return this;
    }
}
