import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (2 bytes), checked with npm run compare.
@Extractor({
    name: 'invaders'
})
export default class Invaders extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 1; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(0, 2).reverse().hexDigits()),
                name: ''
            });
        }
        return this;
    }
}
