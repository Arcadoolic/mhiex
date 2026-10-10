import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HIGH: one score, no name: 3 bytes of decimal digits, most significant first, then the 5 characters
// the screen shows (its last 5 digits; 20 is "0", 21 is "1"...). Checked against the game's screen
// (MAME 0.289), with a modified file loaded by the hiscore plugin (21 22 23 24 25 shows 12345), and
// with a game played by script (00 04 00 and 20 20 24 20 20 for 400).
@Extractor({
    name: 'dday'
})
export default class Dday extends AbstractExtractor {
    extract(): this {
        this.output.default.push({rank: 1, score: parseInt(this.hi!.slice(0, 3).hexDigits()), name: ''});
        return this;
    }
}
