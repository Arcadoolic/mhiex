import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST SCORES TODAY: 3 scores (2 bytes, little-endian hex digits, x100), then the names stored letter
// by letter (the 3 first letters, the 3 second letters, the 3 third letters), A = 0x14. Checked in
// MAME 0.289 with a modified file loaded by the hiscore plugin (12 34 shows 341200).
@Extractor({
    name: 'challeng'
})
export default class Challeng extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 3; i++) {
            const name = Buffer.from([0, 3, 6].map(column => this.hi!.buffer[6 + column + i]));
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 2, 2).reverse().hexDigits()) * 100,
                name: name.toString('latin1').split('').map(c => String.fromCharCode(c.charCodeAt(0) + 45)).join('')
            });
        }
        return this;
    }
}
