import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING: 10 rows of 7 bytes: the row's index, the score in 2 BCD bytes, the stage, then 3 letters
// (0x11 is A, 0x0D the dot of "M.O", 0x0B "!"; 0x2E and 0x2F are symbols, given as "*"). Checked on the
// game's screen (MAME 0.289) with a modified file (12 34 shows 1234, stage 5, ZAQ; M.Y).
@Extractor({
    name: 'crimfght'
})
export default class Crimfght extends AbstractExtractor {
    protected charset = {
        0x0B: '!',
        0x0D: '.',
        0x2E: '*',
        0x2F: '*',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            const row = i * 7;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row + 1, 2).toHexNumber(),
                name: this.hi!.slice(row + 4, 3).toString(this.charset, 0x30),
                extra: {
                    stage: this.hi!.slice(row + 3, 1).readIntBE()
                }
            });
        }
        return this;
    }
}
