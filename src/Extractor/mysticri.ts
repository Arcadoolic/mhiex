import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 scores (4 bytes, little-endian hex digits), then after 15 bytes (levels) the 10 names (3 ASCII
// characters). Checked against the game's RANKING screen (MAME 0.289).
@Extractor({
    name: 'mysticri'
})
export default class Mysticri extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).reverse().toHexNumber(),
                name: this.hi!.slice(55 + i * 3, 3).toString().trim()
            });
        }
        return this;
    }
}
