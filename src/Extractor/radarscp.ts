import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (170 bytes), checked with npm run compare.
@Extractor({
    name: 'radarscp'
})
export default class Radarscp extends AbstractExtractor {
    protected charset = {
        0x10: ' ',
        0x2B: '.',
        0x2C: '-',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(22 + i * 34, 3).reverse().hexDigits()),
                name: this.hi!.slice(8 + i * 34, 12).toString(this.charset, 48)
            });
        }
        return this;
    }
}
