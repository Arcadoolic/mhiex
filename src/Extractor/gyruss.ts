import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 5 records of 8 bytes: rank, score (3 bytes, little-endian hex
// digits), name (3 encoded characters), 1 byte; then the top score. Checked with npm run compare.
@Extractor({
    name: 'gyruss'
})
export default class Gyruss extends AbstractExtractor {
    protected charset = {0x03: 'C', 0x0B: 'Z', 0x0D: 'X', 0x0F: 'E', 0x25: 'F', 0x29: 'N', 0x34: 'A', 0x39: 'T', 0x3A: 'M', 0x40: 'J', 0x47: 'N', 0x48: 'I', 0x51: 'K', 0x6A: 'P', 0x6D: 'R', 0x83: '', 0x87: 'H', 0x88: 'I', 0xA5: 'M', 0xA7: 'Y', 0xB0: 'Y', 0xB1: 'O', 0xB2: 'O', 0xB4: 'W', 0xBF: 'R', 0xC1: 'S', 0xC2: 'G', 0xC3: 'U', 0xC4: 'D', 0xC6: 'Q', 0xD3: '.', 0xD7: 'K', 0xDC: 'D', 0xE7: 'B', 0xE8: 'L', 0xEE: 'A', 0xF1: 'V', 0xF5: 'U', 0xF8: '.', 0xFC: 'T', 0xFF: 'E'};

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
