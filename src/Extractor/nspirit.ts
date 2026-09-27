import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (123 bytes), checked with npm run compare.
@Extractor({
    name: 'nspirit'
})
export default class Nspirit extends AbstractExtractor {
    protected charset = {
        0x00: '',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 12, 3).reverse().hexDigits())) * 100,
                name: this.hi!.slice(3 + i * 12, 9).toString(this.charset)
            });
        }
        return this;
    }
}
