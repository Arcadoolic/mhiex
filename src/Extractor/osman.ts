import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The table sits on the odd bytes of 16-bit RAM: in the file, every 4 bytes hold 2 bytes of data then
// FF FF. In that data, BEST 10: rows of 12 bytes, the initials on 4 bytes (0x81 is A, 0xE5 the dot of
// "S.R", 0x20 a space), then the score as 8 decimal digits, one per byte. Checked on the game's screen
// (MAME 0.289) with a modified file (Z.Q and digits 0 9 8 7 6 5 4 3 scroll by as 1ST Z.Q 9876543).
@Extractor({
    name: 'osman'
})
export default class Osman extends AbstractExtractor {
    protected charset = {
        0xE5: '.',
        0x20: ' ',
    };

    extract(): this {
        const raw = this.hi!.buffer;
        const out: number[] = [];
        for (let i = 0; i + 1 < raw.length; i += 4) {
            out.push(raw[i], raw[i + 1]);
        }
        const data = Buffer.from(out);
        for (let i = 0; i < 10; i++) {
            const row = i * 12;
            this.output.default.push({
                rank: i + 1,
                score: parseInt(Array.from(data.subarray(row + 4, row + 12)).join(''), 10),
                name: Array.from(data.subarray(row, row + 3)).map(c => this.charset[c as 0xE5] ?? String.fromCharCode(c - 0x40)).join('')
            });
        }
        return this;
    }
}
