import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HIGH SCORES: 10 names of 3 letters (0x0B is A, 0x0A a space), then 10 rows of 4 bytes: the score in 3
// BCD bytes, least significant first, and a byte. Checked on the game's screen (MAME 0.289) with a
// modified file (24 0B 1B and 50 76 98 show 987650 ZAQ; 45 23 01 shows 12345).
@Extractor({
    name: 'mhavoc'
})
export default class Mhavoc extends AbstractExtractor {
    protected charset = {
        0x0A: ' ',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(0x1E + i * 4, 3).reverse().toHexNumber(),
                name: this.hi!.slice(i * 3, 3).toString(this.charset, 0x36)
            });
        }
        return this;
    }
}
