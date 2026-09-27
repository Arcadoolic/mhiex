import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (183 bytes), checked with npm run compare.
@Extractor({
    name: 'lethalth'
})
export default class Lethalth extends AbstractExtractor {
    protected charset = {
        0x2F: '&mid-dot;',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 18, 3).reverse().hexDigits())) * 10,
                name: this.hi!.slice(10 + i * 18, 8).toString(this.charset)
            });
        }
        return this;
    }
}
