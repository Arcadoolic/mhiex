import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (160 bytes), checked with npm run compare.
@Extractor({
    name: 'horizon'
})
export default class Horizon extends AbstractExtractor {
    protected charset = {
        0x6C: '&smiley;',
        0x6D: '&womens-symbol;',
        0x6E: '&mens-symbol;',
        0x6F: '^',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 16, 2).reverse().hexDigits())) * 100,
                name: this.hi!.slice(2 + i * 16, 3).toString(this.charset)
            });
        }
        return this;
    }
}
