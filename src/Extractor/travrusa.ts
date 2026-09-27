import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (78 bytes), checked with npm run compare.
@Extractor({
    name: 'travrusa'
})
export default class Travrusa extends AbstractExtractor {
    protected charset = {
        0x00: ' ',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 7, 3).reverse().hexDigits()),
                name: this.hi!.slice(4 + i * 7, 3).toString(this.charset)
            });
        }
        return this;
    }
}
