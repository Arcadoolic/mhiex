import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 rows of 7 bytes: the score in 4 BCD bytes, then 3 letters (0x21 is A). Checked on the game's
// screen (MAME 0.289) with a modified file (00 98 76 50 shows 987650, ZAQ).
@Extractor({
    name: 'chinagat'
})
export default class Chinagat extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 7, 4).toHexNumber(),
                name: this.hi!.slice(i * 7 + 4, 3).toString({}, 0x20)
            });
        }
        return this;
    }
}
