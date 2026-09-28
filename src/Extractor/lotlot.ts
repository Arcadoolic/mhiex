import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 50 records of 11 bytes: score (3 bytes, hex digits, x10), name (7 ASCII characters), 00; then the
// top score. Checked against the game's SCORE RANKING screen (MAME 0.289), which shows the first 9.
@Extractor({
    name: 'lotlot'
})
export default class Lotlot extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 50; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 11, 3).toHexNumber() * 10,
                name: this.hi!.slice(i * 11 + 3, 7).toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
