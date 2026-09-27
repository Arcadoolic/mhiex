import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 8 records of 16 bytes: score (3 bytes, little-endian hex digits, x10), then the name's 3 letters at
// bytes 5, 7 and 9 (A = 0, 0x26 = '.'), then team and match details. Checked against the game's BEST
// PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'dsoccr94'
})
export default class Dsoccr94 extends AbstractExtractor {
    protected letter(code: number): string {
        if (code === 0x26) return '.';
        return code < 26 ? String.fromCharCode(65 + code) : ' ';
    }

    extract(): this {
        for (let i = 0; i < 8; i++) {
            const currentByte = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(currentByte, 3).reverse().hexDigits()) * 10,
                name: [5, 7, 9].map(k => this.letter(this.hi!.buffer[currentByte + k])).join('')
            });
        }
        return this;
    }
}
