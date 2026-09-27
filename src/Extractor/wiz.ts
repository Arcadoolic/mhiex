import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (50 bytes), checked with npm run compare.
@Extractor({
    name: 'wiz'
})
export default class Wiz extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 10, 7).decodeBCD(),
                name: this.hi!.slice(7 + i * 10, 3).toString()
            });
        }
        return this;
    }
}
