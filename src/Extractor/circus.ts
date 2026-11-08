import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TODAYS HIGH SCORE: one score, no name: 2 BCD bytes, least significant first, in tens. Checked on the
// game's screen (MAME 0.289) with a modified file (12 34 shows 34120).
@Extractor({
    name: 'circus'
})
export default class Circus extends AbstractExtractor {
    extract(): this {
        this.output.default.push({rank: 1, score: this.hi!.slice(0, 2).reverse().toHexNumber() * 10, name: ''});
        return this;
    }
}
