import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// MOUSETRAP HALL OF FAME: 5 offsets (00, 06... into the rows), then 5 rows of 6 bytes: the score in tens (3 BCD bytes),
// then 3 ASCII letters. The game does not sort the rows: it draws the row the last offset points at
// first. Checked on the game's screen (MAME 0.289) with modified files: 09 87 65 ZAQ in the first row
// shows ZAQ 987650 at the bottom (00 49 72 is 49720), and reversing the offsets reverses the ranking.
@Extractor({
    name: 'mtrap'
})
export default class Mtrap extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const row = 5 + this.hi!.buffer[4 - i];
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 3).toHexNumber() * 10,
                name: this.hi!.slice(row + 3, 3).toString()
            });
        }
        return this;
    }
}
