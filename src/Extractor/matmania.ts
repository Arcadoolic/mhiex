import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 rows of 16 bytes: the score in 3 BCD bytes, least significant first, tens not stored, the round
// reached (the screen shows the byte as a hex digit), 4 unused bytes, then the name on 8 bytes of which
// the screen shows 3 (0xBB is A, 0xB0 fills); the top score follows. Checked on the game's screen
// (MAME 0.289) with a modified file (09 87 65 shows 6587090, ZAQ).
@Extractor({
    name: 'matmania'
})
export default class Matmania extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const row = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 3).reverse().toHexNumber() * 10,
                name: this.hi!.slice(row + 8, 3).toString({0xB0: ' '}, -0x7A),
                extra: {
                    round: this.hi!.slice(row + 3, 1).readIntBE()
                }
            });
        }
        return this;
    }
}
