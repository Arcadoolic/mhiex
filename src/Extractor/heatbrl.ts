import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 10 PLAYERS: rows of 10 bytes, the name on 4 ASCII characters, the score as a 32-bit number, then
// the stage and a byte. Checked on the game's screen (MAME 0.289) with a modified file ("ZAQ " 123456,
// stage 3 shows ZAQ 123456 3).
@Extractor({
    name: 'heatbrl'
})
export default class Heatbrl extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            const row = i * 10;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row + 4, 4).buffer.readUInt32BE(0),
                name: this.hi!.slice(row, 4).toString().trimEnd(),
                extra: {
                    stage: this.hi!.buffer[row + 8]
                }
            });
        }
        return this;
    }
}
