import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: from nvram byte 16400, 20 records of 16 bytes, every other byte
// used: score (4 bytes, hex digits), name (3 ASCII characters), checksum. Checked with npm run compare.
@Extractor({
    name: 'narc',
    hi: false,
    nvram: 'nvram'
})
export default class Narc extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 20; i++) {
            const o = 16400 + i * 16;
            this.output.default.push({
                rank: i + 1,
                score: this.nvram!.slice(o, 8).byteSkip(true).toHexNumber(),
                name: this.nvram!.slice(o + 8, 6).byteSkip(true).toString().trim()
            });
        }
        return this;
    }
}
