import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HI SCR: one score, no name: 2 bytes of decimal digits, least significant first, in tens (the
// screen adds a final 0). Checked against the game's screen (MAME 0.289), with a modified file
// loaded by the hiscore plugin (34 12 shows 12340); 00 10, the game's default, is 10000.
@Extractor({
    name: 'targ'
})
export default class Targ extends AbstractExtractor {
    extract(): this {
        this.output.default.push({rank: 1, score: parseInt(this.hi!.slice(0, 2).reverse().hexDigits()) * 10, name: ''});
        return this;
    }
}
