import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (33 bytes), checked with npm run compare.
@Extractor({
    name: 'scramble'
})
export default class Scramble extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 3, 3).reverse().hexDigits()),
                name: ''
            });
        }
        return this;
    }
}
