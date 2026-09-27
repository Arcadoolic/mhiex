import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (123 bytes), checked with npm run compare.
@Extractor({
    name: 'bchopper'
})
export default class Bchopper extends AbstractExtractor {
    protected charset = {
        0x0B: '.',
        0x0D: '!',
        0x0C: '?',
        0x60: ' ',
        0x7D: '-',
        0x7E: '&',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 12, 3).reverse().hexDigits())) * 10,
                name: this.hi!.slice(3 + i * 12, 9).toString(this.charset, -32)
            });
        }
        return this;
    }
}
