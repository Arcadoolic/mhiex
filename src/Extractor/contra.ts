import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (68 bytes), checked with npm run compare.
@Extractor({
    name: 'contra'
})
export default class Contra extends AbstractExtractor {
    protected charset = {
        0x0D: '.',
        0x0E: '?',
        0x0F: '!',
        0x10: ' ',
        0x2B: ',',
    };

    extract(): this {
        for (let i = 0; i < 8; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(4 + i * 8, 4).hexDigits()),
                name: this.hi!.slice(i * 8, 3).toString(this.charset, 48)
            });
        }
        return this;
    }
}
