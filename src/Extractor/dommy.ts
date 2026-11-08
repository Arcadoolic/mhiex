import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HI-SCORE: one score, no name: 3 BCD bytes, least significant first. Checked on the game's screen
// (MAME 0.289) with a modified file (60 45 23 shows 234560; the default 00 00 05 shows 50000).
@Extractor({
    name: 'dommy'
})
export default class Dommy extends AbstractExtractor {
    extract(): this {
        this.output.default.push({rank: 1, score: this.hi!.slice(0, 3).reverse().toHexNumber(), name: ''});
        return this;
    }
}
