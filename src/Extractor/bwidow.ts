import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BLACK WIDOW HALL OF FAME: 20 rows of 7 bytes from byte 0x0E: 3 letters (low 5 bits, 1 is A, 1B a
// star, 0 blank; the high bits pick the colour), the score in 3 BCD bytes, then the wave (BCD).
// Checked on the game's screen (MAME 0.289) with a modified file (DA 41 11 09 87 65 23 shows ZAQ 98765
// 23).
@Extractor({
    name: 'bwidow'
})
export default class Bwidow extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 20; i++) {
            const row = 0x0E + i * 7;
            const name = Array.from(this.hi!.slice(row, 3).buffer).map(c => {
                const l = c & 0x1F;
                return l === 0 ? ' ' : l === 0x1B ? '*' : l <= 26 ? String.fromCharCode(64 + l) : '?';
            }).join('');
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row + 3, 3).toHexNumber(),
                name,
                extra: {
                    wave: this.hi!.slice(row + 6, 1).toHexNumber()
                }
            });
        }
        return this;
    }
}
