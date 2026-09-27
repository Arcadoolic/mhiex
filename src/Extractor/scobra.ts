import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// SCORE RANKING: 10 scores (3 bytes, little-endian hex digits), no names; then the top score. Checked
// against the game's screen (MAME 0.289), and with a modified file loaded by the hiscore plugin
// (56 34 12 shows 123456).
@Extractor({
    name: 'scobra'
})
export default class Scobra extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({rank: i + 1, score: this.hi!.slice(i * 3, 3).reverse().toHexNumber(), name: ''});
        }
        return this;
    }
}
