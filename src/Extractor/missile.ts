import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (48 bytes), checked with npm run compare.
@Extractor({
    name: 'missile'
})
export default class Missile extends AbstractExtractor {
    protected charset = {
        0x5B: ' ',
        0xD4: 'T',
    };

    extract(): this {
        for (let i = 0; i < 8; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(45 + i * -3, 3).reverse().hexDigits()),
                name: this.hi!.slice(21 + i * -3, 3).toString(this.charset)
            });
        }
        return this;
    }
}
