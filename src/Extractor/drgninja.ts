import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST PLAYERS: 20 rows of 8 bytes, 3 ASCII letters and 00, the score in hundreds (2 BCD bytes), then
// the level (16-bit); the top score follows. Checked on the game's screen (MAME 0.289) with a modified
// file (ZAQ 98 76 00 05 shows ZAQ 987600 5).
@Extractor({
    name: 'drgninja'
})
export default class Drgninja extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 20; i++) {
            const row = i * 8;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row + 4, 2).toHexNumber() * 100,
                name: this.hi!.slice(row, 3).toString(),
                extra: {
                    level: this.hi!.slice(row + 6, 2).buffer.readUInt16BE(0)
                }
            });
        }
        return this;
    }
}
