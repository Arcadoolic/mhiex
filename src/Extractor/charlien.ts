import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The table sits on the odd bytes of 16-bit RAM: in the file, every 4 bytes hold 2 bytes of data then
// FF FF. In that data: 16 bytes of row order (the high byte of each word is the row shown at that rank),
// then rows of 12 bytes, the initials in ASCII on 4 bytes ("N.M "), then the score as 8 decimal digits,
// one per byte. BEST RANKING TOP 5. Checked on the game's screen (MAME 0.289) with a modified file:
// swapping the first two order words shows M.Y first and the modified row (Z.Q, digits 0 9 8 7 6 5 4 3)
// second with 09876543.
@Extractor({
    name: 'charlien'
})
export default class Charlien extends AbstractExtractor {
    private unpack(): Buffer {
        const raw = this.hi!.buffer;
        const out: number[] = [];
        for (let i = 0; i + 1 < raw.length; i += 4) {
            out.push(raw[i], raw[i + 1]);
        }
        return Buffer.from(out);
    }

    extract(): this {
        const data = this.unpack();
        for (let i = 0; i < 5; i++) {
            const row = 16 + data[i * 2] * 12;
            this.output.default.push({
                rank: i + 1,
                score: parseInt(Array.from(data.subarray(row + 4, row + 12)).join(''), 10),
                name: data.subarray(row, row + 3).toString('latin1')
            });
        }
        return this;
    }
}
