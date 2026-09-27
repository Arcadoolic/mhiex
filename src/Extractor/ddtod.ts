import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 30 records of 16 bytes: stage, character, name (8 characters, A =
// 0), score (4 bytes, hex digits), 2 bytes; the MAME 0.289 hiscore.dat entry cuts the 30th record to a
// 3-byte score (x100). Checked against the game's RANKING screen (MAME 0.289) and with npm run compare.
@Extractor({
    name: 'ddtod'
})
export default class Ddtod extends AbstractExtractor {
    protected charset = {0x1A: '0', 0x1B: '1', 0x1C: '2', 0x1D: '3', 0x1E: '4', 0x1F: '5', 0x20: '6', 0x21: '7', 0x22: '8', 0x23: '9', 0x24: 'Ⅰ', 0x25: 'Ⅱ', 0x26: 'Ⅲ', 0x27: 'Ⅳ', 0x28: 'Ⅴ', 0x29: '.', 0x2A: '&', 0x2B: '!', 0x2C: '?', 0x2D: '-', 0x2E: ' ', 0xFF: ''};
    protected characterNames = ['fighter', 'cleric', 'elf', 'dwarf'];

    extract(): this {
        for (let i = 0; i < 30; i++) {
            const o = i * 16;
            const b = this.hi!.buffer;
            this.output.default.push({
                rank: i + 1,
                score: i < 29 ? this.hi!.slice(o + 10, 4).toHexNumber() : this.hi!.slice(o + 10, 3).toHexNumber() * 100,
                name: this.hi!.slice(o + 2, 8).toString(this.charset, 0x41).trim(),
                extra: {stage: b[o], character: this.characterNames[b[o + 1]] ?? b[o + 1]}
            });
        }
        return this;
    }
}
