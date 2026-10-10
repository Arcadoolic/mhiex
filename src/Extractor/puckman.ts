import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HIGH SCORE: one score, no name. 4 bytes of decimal digits, least significant first (40 59 01 00
// is 15940), then the six characters the screen shows. Checked against the game's screen
// (MAME 0.289) with a file from a real game.
@Extractor({
    name: 'puckman'
})
export default class Puckman extends AbstractExtractor {
    extract(): this {
        this.output.default.push({rank: 1, score: parseInt(this.hi!.slice(0, 4).reverse().hexDigits()), name: ''});
        return this;
    }
}
