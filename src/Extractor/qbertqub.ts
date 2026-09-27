import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: from nvram byte 815, 20 records of 15 bytes stored from the last
// rank: 3 bytes, score (8 bytes, low nibbles), 1 byte, name (3 characters, A = 0x0A, FF blank).
// Checked with npm run compare.
@Extractor({
    name: 'qbertqub',
    hi: false,
    nvram: 'nvram'
})
export default class Qbertqub extends AbstractExtractor {
    extract(): this {
        for (let rank = 1; rank <= 20; rank++) {
            const o = 815 + (20 - rank) * 15;
            this.output.default.push({
                rank,
                score: parseInt(this.nvram!.slice(o + 3, 8).hexDigits('odd')),
                name: this.nvram!.slice(o + 12, 3).toString({0xFF: ' '}, 55).trim()
            });
        }
        return this;
    }
}
