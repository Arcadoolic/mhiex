import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (38 bytes), checked with npm run compare.
@Extractor({
    name: 'thepit'
})
export default class Thepit extends AbstractExtractor {
    protected charset = {
        0xFF: '.',
    };

    extract(): this {
        for (let i = 0; i < 3; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(26 + i * 5, 2).reverse().hexDigits())) * 100,
                name: this.hi!.slice(23 + i * 5, 3).toString(this.charset, 55)
            });
        }
        return this;
    }
}
