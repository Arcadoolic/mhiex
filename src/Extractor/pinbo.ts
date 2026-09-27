import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 7 records of 16 bytes: name (6 characters: digits 0-9, A = 0x0A, 0x24 blank, shown as dashes),
// 5 bytes, score (3 bytes, little-endian hex digits, x10), 2 bytes. Checked against the game's
// ranking screen (MAME 0.289), and with a modified file loaded by the hiscore plugin.
@Extractor({
    name: 'pinbo'
})
export default class Pinbo extends AbstractExtractor {
    protected charset = {
        0x00: '0', 0x01: '1', 0x02: '2', 0x03: '3', 0x04: '4', 0x05: '5', 0x06: '6', 0x07: '7', 0x08: '8',
        0x09: '9', 0x24: ' '
    };

    extract(): this {
        for (let i = 0; i < 7; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 16 + 11, 3).reverse().toHexNumber() * 10,
                name: this.hi!.slice(i * 16, 6).toString(this.charset, 0x37).trim()
            });
        }
        return this;
    }
}
