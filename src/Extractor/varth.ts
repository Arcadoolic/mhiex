import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING BEST 10: rows of 8 bytes, the score in 4 BCD bytes, 3 letters in ASCII, then the stage reached
// (shown as S01); the top score follows. Checked on the game's screen (MAME 0.289) with a modified file
// (09 87 65 40 shows 9876540, ZAQ, S07).
@Extractor({
    name: 'varth'
})
export default class Varth extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 3).toString(),
                extra: {
                    stage: this.hi!.slice(i * 8 + 7, 1).readIntBE()
                }
            });
        }
        return this;
    }
}
