import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// SCORE RANKING: rows of 8 bytes, 3 letters (0x11 is A), a byte, then the score in 4 BCD bytes; the top
// score follows. Checked on the game's screen (MAME 0.289) with a modified file (ZAQ 00 98 76 50 shows
// ZAQ 987650).
@Extractor({
    name: 'typhoon'
})
export default class Typhoon extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8 + 4, 4).toHexNumber(),
                name: this.hi!.slice(i * 8, 3).toString({}, 0x30)
            });
        }
        return this;
    }
}
