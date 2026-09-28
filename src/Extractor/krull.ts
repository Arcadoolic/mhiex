import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: from nvram byte 2767, 10 records of 10 bytes: name (3 characters,
// A = 0x0A), score (7 bytes, low nibbles, little-endian hex digits). Checked with npm run compare.
@Extractor({
    name: 'krull',
    hi: false,
    nvram: 'nvram'
})
export default class Krull extends AbstractExtractor {
    protected charset = {0x7F: ' ', 0x24: '.'};

    extract(): this {
        for (let i = 0; i < 10; i++) {
            const o = 2767 + i * 10;
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.nvram!.slice(o + 3, 7).reverse().hexDigits('odd')),
                name: this.nvram!.slice(o, 3).toString(this.charset, 55).trim()
            });
        }
        return this;
    }
}
