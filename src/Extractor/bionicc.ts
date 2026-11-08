import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 rows of 8 bytes: the score in 4 BCD bytes, then 4 characters in ASCII ("CAP ", the last row ends
// with 00). Checked on the game's screen (MAME 0.289) with a modified file (00 98 76 54 shows 987654,
// ZAQ.).
@Extractor({
    name: 'bionicc'
})
export default class Bionicc extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 4).toString({0x00: ''}).trimEnd()
            });
        }
        return this;
    }
}
