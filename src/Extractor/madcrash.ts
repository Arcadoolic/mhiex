import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// YOUR SCORE IS BEST FIVE: after 5 bytes (the top score), rows of 7 bytes, the score in 4 BCD bytes
// then 3 ASCII letters; the screen ranks the first 5. Checked on the game's screen (MAME 0.289) with a
// modified file (00 98 76 54 ZAQ shows 987654 ZAQ).
@Extractor({
    name: 'madcrash'
})
export default class Madcrash extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const row = 5 + i * 7;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 4).toHexNumber(),
                name: this.hi!.slice(row + 4, 3).toString()
            });
        }
        return this;
    }
}
