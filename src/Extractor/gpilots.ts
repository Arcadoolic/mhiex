import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP 10 RANKING: rows of 8 bytes from byte 4, the score in hundreds (2 BCD bytes), 3 letters (00 is
// A) and 3 bytes. The hiscore.dat range stops before the 10th name, so 9 rows are read. Checked on the
// game's screen (MAME 0.289) with a modified file (98 76, 19 00 10 shows ZAQ 987600).
@Extractor({
    name: 'gpilots'
})
export default class Gpilots extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 9; i++) {
            const row = 4 + i * 8;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 2).toHexNumber() * 100,
                name: this.hi!.slice(row + 2, 3).toString({}, 0x41)
            });
        }
        return this;
    }
}
