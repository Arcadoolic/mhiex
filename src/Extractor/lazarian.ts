import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TODAYS HIGH SCORES: the top score (3 BCD bytes), then rows of 6 bytes: 3 letters (0xC0 is A) and the
// score in 3 BCD bytes, of which the screen shows the last 5 digits (read the same way here). The
// hiscore.dat range stops before the 5th score, so only 4 rows are read. Checked on the game's screen
// (MAME 0.289) with a modified file (ZAQ then 45 67 89 shows ZAQ 56789; 00 01 23 as top score shows
// 00123).
@Extractor({
    name: 'lazarian'
})
export default class Lazarian extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 4; i++) {
            const row = 3 + i * 6;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row + 3, 3).toHexNumber() % 100000,
                name: this.hi!.slice(row, 3).toString({}, -0x7F)
            });
        }
        return this;
    }
}
