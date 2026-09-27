import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (283 bytes), checked with npm run compare.
@Extractor({
    name: 'tempest'
})
export default class Tempest extends AbstractExtractor {
    protected charset = {
        0x1A: ' ',
    };

    extract(): this {
        for (let i = 0; i < 85; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(279 + i * -3, 3).reverse().hexDigits()),
                name: i < 8 ? this.hi!.slice(23 + i * -3, 3).reverse().toString(this.charset, 65) : ''
            });
        }
        return this;
    }
}
