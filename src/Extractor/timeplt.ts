import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 5 records of 8 bytes: rank, score (3 bytes, little-endian hex
// digits), name (3 encoded characters), 1 byte; then the top score. Checked with npm run compare.
@Extractor({
    name: 'timeplt'
})
export default class Timeplt extends AbstractExtractor {
    protected charset = {0x74: 'A', 0xA5: 'A', 0xB1: 'B', 0xCC: 'C', 0x77: 'C', 0xEC: 'D', 0x5C: 'E', 0x34: 'E', 0x16: 'F', 0x39: 'G', 0x50: 'H', 0x67: 'I', 0xFD: 'I', 0x21: 'J', 0x7A: 'K', 0x7C: 'K', 0xC5: 'L', 0xF7: 'M', 0x38: 'M', 0xBE: 'N', 0x3B: 'N', 0x54: 'O', 0x68: 'O', 0x80: 'P', 0x2F: 'Q', 0x5F: 'R', 0xD7: 'R', 0x9F: 'S', 0xED: 'S', 0x6D: 'T', 0xDC: 'T', 0x44: 'U', 0x0D: 'U', 0xB8: 'V', 0xE7: 'W', 0xBD: 'X', 0x89: 'Y', 0xBF: 'Y', 0x59: 'Z', 0x1A: '.', 0x11: '.'};

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const o = i * 8;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o + 1, 3).reverse().toHexNumber(),
                name: this.hi!.slice(o + 4, 3).toString(this.charset).trim()
            });
        }
        return this;
    }
}
