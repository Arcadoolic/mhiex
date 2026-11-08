import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// SCORE: 9 rows of 12 bytes. The hiscore.dat range starts one byte into a 16-bit word, so in the file a
// row's 3 letters (00 is A) are at +0, +2 and +4 (the low bytes of words), and its score is the 3 BCD
// bytes at +8 (01 80 00 is 18000). Checked on the game's screen (MAME 0.289) with a modified file
// (19 .. 00 .. 10 and 01 23 45 show 12345 ZAQ first).
@Extractor({
    name: 'tdragon2'
})
export default class Tdragon2 extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 9; i++) {
            const row = i * 12;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row + 8, 3).toHexNumber(),
                name: [0, 2, 4].map(o => String.fromCharCode(this.hi!.buffer[row + o] + 0x41)).join('')
            });
        }
        return this;
    }
}
