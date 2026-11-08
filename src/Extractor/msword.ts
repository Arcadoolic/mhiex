import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HALL OF VALIENTS: 10 rows of 16 bytes, the score in 4 BCD bytes, 3 letters (twice the letter's index:
// 00 is A, 02 is B), a byte, the floor reached, then bytes the screen does not show; the top score
// follows. Checked on the game's screen (MAME 0.289) with a modified file (09 87 65 40 shows 9876540,
// ZAQ, floor 1E shows 30).
@Extractor({
    name: 'msword'
})
export default class Msword extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            const row = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 4).toHexNumber(),
                name: this.hi!.slice(row + 4, 3).toString({}, 0x41, 2),
                extra: {
                    floor: this.hi!.slice(row + 8, 1).readIntBE()
                }
            });
        }
        return this;
    }
}
