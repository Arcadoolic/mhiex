import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score (4 bytes), then BEST 7 SCORES: records of 10 bytes: score (4 bytes, hex digits), name
// (4 ASCII characters), 2 bytes. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'sharrier'
})
export default class Sharrier extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 7; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 10, 4).toHexNumber(),
                name: this.hi!.slice(8 + i * 10, 4).toString().trim()
            });
        }
        return this;
    }
}
