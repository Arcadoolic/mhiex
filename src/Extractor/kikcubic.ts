import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 20 bytes: score (3 bytes, hex digits, x10), name (16 ASCII characters, 0x5B-0x64 are
// symbols), round (1 byte); then the top score. Checked against the game's BEST 10 PLAYERS screen
// (MAME 0.289).
@Extractor({
    name: 'kikcubic'
})
export default class Kikcubic extends AbstractExtractor {
    protected charset = {
        0x5B: '♥', 0x5C: '●', 0x5D: '♥', 0x60: '◆', 0x61: '♁', 0x62: '♀', 0x63: '□', 0x64: '☺'
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 20, 3).toHexNumber() * 10,
                name: this.hi!.slice(i * 20 + 3, 16).toString(this.charset).trim(),
                extra: {round: this.hi!.buffer[i * 20 + 19]}
            });
        }
        return this;
    }
}
