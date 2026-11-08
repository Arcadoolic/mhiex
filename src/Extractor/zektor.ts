import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP FIVE PLAYERS: a list of scores in hundreds (2 BCD bytes, least significant first; the first 5
// are the ranking), then 5 names of 3 letters (00 is A). Checked on the game's screen (MAME 0.289) with
// a modified file (65 87 and 19 00 10 show ZAQ 876500).
@Extractor({
    name: 'zektor'
})
export default class Zektor extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 2, 2).reverse().toHexNumber() * 100,
                name: this.hi!.slice(57 + i * 3, 3).toString({}, 0x41)
            });
        }
        return this;
    }
}
