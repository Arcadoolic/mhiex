import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 scores (3 bytes, hex digits, x10), then 10 names (3 characters: digits 0-9, A = 0x0A, 0x5D '.').
// Checked against the game's 10 HIGHEST SCORES screen (MAME 0.289).
@Extractor({
    name: 'iceclimb'
})
export default class Iceclimb extends AbstractExtractor {
    protected charset = {
        0x00: '0', 0x01: '1', 0x02: '2', 0x03: '3', 0x04: '4', 0x05: '5', 0x06: '6', 0x07: '7', 0x08: '8',
        0x09: '9', 0x24: ' ', 0x5D: '.'
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 3, 3).toHexNumber() * 10,
                name: this.hi!.slice(30 + i * 3, 3).toString(this.charset, 0x37).trim()
            });
        }
        return this;
    }
}
