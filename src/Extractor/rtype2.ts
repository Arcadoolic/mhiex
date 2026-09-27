import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (144 bytes), checked with npm run compare.
@Extractor({
    name: 'rtype2'
})
export default class Rtype2 extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(20 + i * 11, 4).reverse().hexDigits()),
                name: this.hi!.slice(24 + i * 11, 7).toString()
            });
        }
        return this;
    }
}
