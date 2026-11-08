import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 20 RANKING: after a byte, 20 rows of 13 bytes: the score in tens (3 BCD bytes), the name on 8
// ASCII characters, then the stage on 2 bytes (02 05 is 2-5). Checked on the game's screen (MAME 0.289)
// with a modified file (09 87 65 ZAQ.XYZ 04 03 shows NO.1 0987650 ZAQ.XYZ 4-3, and rows numbered in
// order down to NO.20).
@Extractor({
    name: 'hasamu'
})
export default class Hasamu extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 20; i++) {
            const row = 1 + i * 13;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 3).toHexNumber() * 10,
                name: this.hi!.slice(row + 3, 8).toString().trimEnd(),
                extra: {
                    stage: `${this.hi!.buffer[row + 11]}-${this.hi!.buffer[row + 12]}`
                }
            });
        }
        return this;
    }
}
