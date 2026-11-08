import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 100 scores of 4 BCD bytes (the screen ranks the first 10), 10 names of 4 bytes (3 letters and 5B),
// then the top score. The letters are tiles of a font with blank slots (wide letters take two): proven
// on the game's screen (MAME 0.289) by loading every code from 00 to 3B (00 to 2F show A to Z with the
// gaps below, 30 and up lowercase), and 00 98 76 50 shows 987650.
@Extractor({
    name: 'mtwins'
})
export default class Mtwins extends AbstractExtractor {
    protected charset = {
        0x00: 'A', 0x01: 'B', 0x02: 'C', 0x03: 'D', 0x04: 'E', 0x08: 'F', 0x09: 'G', 0x0A: 'H', 0x0B: 'I',
        0x0C: 'J', 0x0F: 'K', 0x10: 'L', 0x12: 'M', 0x13: 'N', 0x14: 'O', 0x18: 'P', 0x19: 'Q', 0x1A: 'R',
        0x1B: 'S', 0x1C: 'T', 0x20: 'U', 0x21: 'V', 0x22: 'W', 0x23: 'X', 0x24: 'Y', 0x28: 'Z',
        0x05: ' ', 0x06: ' ', 0x07: ' ', 0x0D: ' ', 0x0E: ' ', 0x11: ' ', 0x15: ' ', 0x16: ' ', 0x17: ' ',
        0x1D: ' ', 0x1E: ' ', 0x1F: ' ', 0x25: ' ', 0x26: ' ', 0x27: ' ', 0x29: ' ', 0x2D: ' ', 0x2E: ' ',
        0x2F: ' ',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber(),
                name: this.hi!.slice(400 + i * 4, 3).toString(this.charset)
            });
        }
        return this;
    }
}
