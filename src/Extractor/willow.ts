import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 8 bytes: score (4 bytes, hex digits), name (3 characters and a space), then the top
// score (4 bytes). Checked against the game's RANKING screen (MAME 0.289).
@Extractor({
    name: 'willow'
})
export default class Willow extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 3).toString()
            });
        }
        return this;
    }
}
