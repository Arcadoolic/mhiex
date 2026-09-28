import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 scores (3 bytes, little-endian hex digits, x100), then 5 names (3 ASCII characters, stored
// backwards). Checked against the game's ranking screen (MAME 0.289).
@Extractor({
    name: 'itaten'
})
export default class Itaten extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 3, 3).reverse().toHexNumber() * 100,
                name: this.hi!.slice(15 + i * 3, 3).reverse().toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
