import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING: 8 rows of 5 bytes, the score in 2 BCD bytes, then 3 letters in ASCII. Checked on the game's
// screen (MAME 0.289) with a modified file (98 76 shows 9876, ZAQ).
@Extractor({
    name: 'vendetta'
})
export default class Vendetta extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 8; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 5, 2).toHexNumber(),
                name: this.hi!.slice(i * 5 + 2, 3).toString()
            });
        }
        return this;
    }
}
