import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP-SCORE: one score, no name: the first 3 of the 15 bytes, decimal digits, least significant
// first. Checked against the game's screen (MAME 0.289), with a modified file loaded by the hiscore
// plugin (50 34 12 shows 123450), and with a game played (90 06 00 for 690).
@Extractor({
    name: 'redalert'
})
export default class Redalert extends AbstractExtractor {
    extract(): this {
        this.output.default.push({rank: 1, score: parseInt(this.hi!.slice(0, 3).reverse().hexDigits()), name: ''});
        return this;
    }
}
