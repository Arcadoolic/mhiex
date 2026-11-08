import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP FIVE: 5 names of 3 ASCII letters, then 5 scores in 3 BCD bytes. Checked on the game's screen
// (MAME 0.289) with a modified file (ZAQ, 09 87 65 shows ZAQ 098765).
@Extractor({
    name: 'tacscan'
})
export default class Tacscan extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(15 + i * 3, 3).toHexNumber(),
                name: this.hi!.slice(i * 3, 3).toString()
            });
        }
        return this;
    }
}
