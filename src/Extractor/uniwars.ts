import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP SCORE: one score, no name: 3 bytes of decimal digits, least significant first, as galaxian
// (same hardware). Checked against the game's screen (MAME 0.289), with a modified file loaded by
// the hiscore plugin (50 34 12 shows 123450), and with a game played (80 03 00 for 380).
@Extractor({
    name: 'uniwars'
})
export default class Uniwars extends AbstractExtractor {
    extract(): this {
        this.output.default.push({rank: 1, score: parseInt(this.hi!.slice(0, 3).reverse().hexDigits()), name: ''});
        return this;
    }
}
