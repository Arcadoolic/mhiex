import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (124 bytes), checked with npm run compare.
@Extractor({
    name: 'vaportra'
})
export default class Vaportra extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(4 + i * 12, 4).hexDigits())) * 10,
                name: this.hi!.slice(i * 12, 3).toString()
            });
        }
        return this;
    }
}
