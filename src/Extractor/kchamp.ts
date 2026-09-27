import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (111 bytes), checked with npm run compare.
@Extractor({
    name: 'kchamp'
})
export default class Kchamp extends AbstractExtractor {
    protected charset = {
        0x25: '.',
        0x26: '-',
        0x27: '&left-foot;',
        0x2D: '&right-foot;',
        0x2F: '&black-heart;',
        0x3C: ' ',
    };

    extract(): this {
        for (let i = 0; i < 6; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 18, 3).hexDigits()),
                name: this.hi!.slice(6 + i * 18, 6).byteSkip(true).toString(this.charset, 55)
            });
        }
        return this;
    }
}
