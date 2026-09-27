import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (13 bytes), checked with npm run compare.
@Extractor({
    name: 'olibochu'
})
export default class Olibochu extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 1; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(0, 5).hexDigits('odd'))) * 10,
                name: ''
            });
        }
        return this;
    }
}
