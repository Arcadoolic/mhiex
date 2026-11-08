import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 10 SCORES: 10 scores, no names, in rows of 16 bytes, the 10th first: the score's digits one per
// byte, least significant first (6 digits), then the number of digits shown. Checked on the game's
// screen (MAME 0.289) with a modified file (the last row 05 04 03 02 01 09 06 shows 1. 912345, the one
// before 00 05 02 .. 03 shows 2. 250).
@Extractor({
    name: 'wilytowr'
})
export default class Wilytowr extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            const row = (9 - i) * 16;
            const digits = Array.from(this.hi!.slice(row, 6).buffer).reverse().join('');
            this.output.default.push({rank: i + 1, score: parseInt(digits, 10), name: ''});
        }
        return this;
    }
}
