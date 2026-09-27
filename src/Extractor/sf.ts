import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING BEST 10: records of 16 bytes: score (8 bytes, one digit each, x10), 00, name (3 characters:
// digits 0-9, A = 0x0A), 4 bytes (cut from the 10th record by the MAME 0.289 hiscore.dat entry).
// Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'sf'
})
export default class Sf extends AbstractExtractor {
    protected charset = {
        0x00: '0', 0x01: '1', 0x02: '2', 0x03: '3', 0x04: '4', 0x05: '5', 0x06: '6', 0x07: '7', 0x08: '8',
        0x09: '9'
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 16, 8).hexDigits('odd')) * 10,
                name: this.hi!.slice(i * 16 + 9, 3).toString(this.charset, 0x37).trim()
            });
        }
        return this;
    }
}
