import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (79 bytes), checked with npm run compare.
@Extractor({
    name: 'gemini'
})
export default class Gemini extends AbstractExtractor {
    protected charset = {
        0x40: ' ',
        0x5B: '-',
        0x5C: '&mid-dot;',
        0x5D: '.',
        0x5E: '?',
        0x5F: '!',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 3, 3).reverse().hexDigits())) * 10,
                name: this.hi!.slice(30 + i * 4, 3).reverse().toString(this.charset)
            });
        }
        return this;
    }
}
