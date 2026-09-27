import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (12 bytes), checked with npm run compare.
@Extractor({
    name: 'naughtyb'
})
export default class Naughtyb extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 1; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(0, 3).hexDigits()),
                name: ''
            });
        }
        return this;
    }
}
