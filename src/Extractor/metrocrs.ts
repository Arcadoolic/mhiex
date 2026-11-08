import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP FIVE: rows of 25 bytes drawn as characters (00 to 09 digits, 0A is A, 2B blank): the score on 7,
// 4 blank, the round on 2, 3 blank, then the name on up to 7, ended by FF B4 (the hiscore.dat range
// stops 2 bytes into the 5th name's end). Checked on the game's screen (MAME 0.289) with a modified file
// (01 02 03 04 05 06 07, round 09, 23 0A 1A FF shows 1234567 9 ZAQ).
@Extractor({
    name: 'metrocrs'
})
export default class Metrocrs extends AbstractExtractor {
    private chars(from: number, length: number): string {
        let out = '';
        for (const c of this.hi!.slice(from, length).buffer) {
            if (c === 0xFF) break;
            out += c <= 9 ? String(c) : c <= 0x23 ? String.fromCharCode(c - 0x0A + 65) : ' ';
        }
        return out;
    }

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const row = i * 25;
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.chars(row, 7).trim() || '0', 10),
                name: this.chars(row + 16, 7).trimEnd(),
                extra: {
                    round: parseInt(this.chars(row + 11, 2).trim() || '0', 10)
                }
            });
        }
        return this;
    }
}
