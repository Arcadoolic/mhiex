import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (30 bytes), checked with npm run compare.
@Extractor({
    name: 'seicross'
})
export default class Seicross extends AbstractExtractor {
    protected charset = {
        0x34: '.',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 3, 3).reverse().hexDigits()),
                name: this.hi!.slice(15 + i * 3, 3).toString(this.charset, 55)
            });
        }
        return this;
    }
}
