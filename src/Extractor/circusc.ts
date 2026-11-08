import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// SCORE RANKING: 7 rows of 7 bytes, the score in 3 BCD bytes whose last digit the screen never shows
// (it prints a 0), 3 letters in ASCII, then the stage (BCD); the top score follows. Checked on the
// game's screen (MAME 0.289) with a modified file (09 87 65 shows 98760, ZAQ, stage 09).
@Extractor({
    name: 'circusc'
})
export default class Circusc extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 7; i++) {
            this.output.default.push({
                rank: i + 1,
                score: Math.floor(this.hi!.slice(i * 7, 3).toHexNumber() / 10) * 10,
                name: this.hi!.slice(i * 7 + 3, 3).toString(),
                extra: {
                    stage: this.hi!.slice(i * 7 + 6, 1).toHexNumber()
                }
            });
        }
        return this;
    }
}
