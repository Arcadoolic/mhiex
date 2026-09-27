import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: from nvram byte 306, 30 records of 14 bytes (one nibble per byte):
// score (8 digits), name (3 characters of 2 nibbles: digits, then A = 0x0B). Slots scoring 0 (the whole default
// table) are left out. Checked with npm run compare.
@Extractor({
    name: 'sinistar',
    hi: false,
    nvram: 'nvram'
})
export default class Sinistar extends AbstractExtractor {
    protected charset = {
        0x00: '0', 0x01: '1', 0x02: '2', 0x03: '3', 0x04: '4', 0x05: '5', 0x06: '6', 0x07: '7', 0x08: '8', 0x09: '9',
        0x0A: ' ', 0x26: '=', 0x27: '-', 0x28: '?', 0x29: '!', 0x2A: '<', 0x2B: '>', 0x2C: '\'', 0x2D: ',', 0x2E: '.'};

    extract(): this {
        for (let i = 0; i < 30; i++) {
            const o = 306 + i * 14;
            const score = parseInt(this.nvram!.slice(o, 8).hexDigits('odd'));
            if (!score) {
                continue;
            }
            this.output.default.push({
                rank: i + 1,
                score,
                name: this.nvram!.slice(o + 8, 6).nibbleSkip(false).toString(this.charset, 54).trim()
            });
        }
        return this;
    }
}
