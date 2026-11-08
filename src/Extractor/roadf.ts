import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// SCORE NAME RANK: rows of 8 bytes, the score in 3 BCD bytes, 3 letters in ASCII, a byte, then the RANK
// column; the screen ranks the first 10 of the rows the hiscore.dat range covers. Checked on the game's
// screen (MAME 0.289) with a modified file (09 87 65 shows 98765, ZAQ, rank 7).
@Extractor({
    name: 'roadf'
})
export default class Roadf extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 3).toHexNumber(),
                name: this.hi!.slice(i * 8 + 3, 3).toString()
            });
        }
        return this;
    }
}
