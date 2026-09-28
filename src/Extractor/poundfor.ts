import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// ALL TIME RANKING: 10 records of 40 bytes: fight money (4 bytes, little-endian hex digits, x10),
// name (16 ASCII characters), then the fight record. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'poundfor'
})
export default class Poundfor extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 40, 4).reverse().toHexNumber() * 10,
                name: this.hi!.slice(i * 40 + 4, 16).toString().trim()
            });
        }
        return this;
    }
}
