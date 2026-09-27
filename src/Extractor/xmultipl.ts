import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 3 bytes, then 5 records of 14 bytes: score (4 bytes, little-endian
// hex digits), name (9 ASCII characters, ended by 00), 1 byte. Checked with npm run compare.
@Extractor({
    name: 'xmultipl'
})
export default class Xmultipl extends AbstractExtractor {
    protected charset = {0x5B: '!', 0x5C: '?', 0x5D: '♥', 0x5E: '-', 0x5F: '?', 0x60: '?', 0x61: '?', 0x62: '○'};

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const o = 3 + i * 14;
            const name = this.hi!.slice(o + 4, 9);
            const end = name.buffer.indexOf(0);
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 4).reverse().toHexNumber(),
                name: (end >= 0 ? name.slice(0, end || undefined) : name).toString(this.charset).trim()
            });
        }
        return this;
    }
}
