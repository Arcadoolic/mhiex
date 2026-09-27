import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (120 bytes), checked with npm run compare.
@Extractor({
    name: 'imgfight'
})
export default class Imgfight extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 4, 3).reverse().hexDigits())) * 100,
                name: this.hi!.slice(40 + i * 8, 8).toString()
            });
        }
        return this;
    }
}
