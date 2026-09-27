import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 14 bytes: score (4 bytes, hex digits), name (10 characters). Checked against the
// game's BEST 10 PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'darkmist'
})
export default class Darkmist extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 14, 4).toHexNumber(),
                name: this.hi!.slice(i * 14 + 4, 10).toString().trim()
            });
        }
        return this;
    }
}
