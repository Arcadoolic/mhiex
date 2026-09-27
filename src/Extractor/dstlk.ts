import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 records of 12 bytes: score (4 bytes, hex digits), name (3), 00, wins (1), 3 unknown bytes; then
// the top score. Checked against the game's BEST 5 FIGHTERS screen (MAME 0.289).
@Extractor({
    name: 'dstlk'
})
export default class Dstlk extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 12, 4).toHexNumber(),
                name: this.hi!.slice(i * 12 + 4, 3).toString(),
                extra: {
                    wins: this.hi!.buffer[i * 12 + 8]
                }
            });
        }
        return this;
    }
}
