import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (63 bytes), checked with npm run compare.
@Extractor({
    name: 'vigilant'
})
export default class Vigilant extends AbstractExtractor {
    protected charset = {
        0x1B: '&black-heart;',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(3 + i * 6, 3).reverse().hexDigits()),
                name: this.hi!.slice(6 + i * 6, 3).toString(this.charset)
            });
        }
        return this;
    }
}
