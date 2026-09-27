import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (173 bytes), checked with npm run compare.
@Extractor({
    name: 'cosmccop'
})
export default class Cosmccop extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 11, 3).reverse().hexDigits()),
                name: this.hi!.slice(8 + i * 11, 3).toString()
            });
        }
        return this;
    }
}
