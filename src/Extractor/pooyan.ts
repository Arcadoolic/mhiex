import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (93 bytes), checked with npm run compare.
@Extractor({
    name: 'pooyan'
})
export default class Pooyan extends AbstractExtractor {
    protected charset = {
        0x00: '&black-heart;',
        0x10: ' ',
        0x2B: '-',
        0x2C: '.',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(30 + i * 3, 3).reverse().hexDigits()),
                name: this.hi!.slice(60 + i * 3, 3).toString(this.charset, 48)
            });
        }
        return this;
    }
}
