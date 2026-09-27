import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score, then 5 scores (3 bytes, hex digits), then 5 records of 14 bytes: 3 bytes, name (10
// characters: digits 0-9, A = 0x0A, 0x24 blank), 1 byte. Default names are blank. Checked with
// modified files loaded by the hiscore plugin (MAME 0.289).
@Extractor({
    name: 'mshuttle'
})
export default class Mshuttle extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(3 + i * 3, 3).toHexNumber(),
                name: this.hi!.slice(21 + i * 14, 10)
                    .toString({0x00: '0', 0x01: '1', 0x02: '2', 0x03: '3', 0x04: '4', 0x05: '5', 0x06: '6',
                        0x07: '7', 0x08: '8', 0x09: '9', 0x24: ' '}, 0x37).trim()
            });
        }
        return this;
    }
}
