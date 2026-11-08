import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HIGH SCORE: one score, no name. 4 bytes of decimal digits, least significant first, then the six
// characters the screen shows (0x40 blank) and a marker. Checked on the game's screen (MAME 0.289) with
// a modified file (50 76 98 00 and 30 35 36 37 38 39 show 987650).
@Extractor({
    name: 'mspacman'
})
export default class Mspacman extends AbstractExtractor {
    extract(): this {
        this.output.default.push({rank: 1, score: parseInt(this.hi!.slice(0, 4).reverse().hexDigits()), name: ''});
        return this;
    }
}
