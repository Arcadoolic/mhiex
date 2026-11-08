import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score (4 BCD bytes), then TOP 10 PLAYERS: rows of 8 bytes, 3 letters (0x11 is A), 00, then the
// score in 4 BCD bytes. The table shows about 7 minutes into attract mode. Checked on the game's screen
// (MAME 0.289) with a modified file (ZAQ 00 12 34 50 shows ZAQ 123450 first).
@Extractor({
    name: 'thunderx'
})
export default class Thunderx extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            const row = 4 + i * 8;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row + 4, 4).toHexNumber(),
                name: this.hi!.slice(row, 3).toString({}, 0x30)
            });
        }
        return this;
    }
}
