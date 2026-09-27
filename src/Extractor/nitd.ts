import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (63 bytes), checked with npm run compare.
@Extractor({
    name: 'nitd'
})
export default class Nitd extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(2 + i * 12, 4).hexDigits()),
                name: this.hi!.slice(6 + i * 12, 4).toString()
            });
        }
        return this;
    }
}
