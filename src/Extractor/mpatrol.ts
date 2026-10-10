import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Top score (the crown): one score, no name: the first 3 of the 44 bytes, decimal digits, least
// significant first. The 4th byte is the point reached, shown as a letter after the score (04: D).
// Checked against the game's screen (MAME 0.289), with a modified file loaded by the hiscore plugin
// (50 34 12 04 shows 123450-D), and with a game played (50 00 00 for 50).
@Extractor({
    name: 'mpatrol'
})
export default class Mpatrol extends AbstractExtractor {
    extract(): this {
        this.output.default.push({rank: 1, score: parseInt(this.hi!.slice(0, 3).reverse().hexDigits()), name: ''});
        return this;
    }
}
