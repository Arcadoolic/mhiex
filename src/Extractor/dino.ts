import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (800 bytes), checked with npm run compare.
@Extractor({
    name: 'dino'
})
export default class Dino extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 50; i++) {
            const score = parseInt(this.hi!.slice(i * 16, 4).hexDigits());
            // Slots past the ranking hold values above 99 000 000: not scores
            if (score > 99000000) {
                continue;
            }
            this.output.default.push({
                rank: this.output.default.length + 1,
                score,
                name: this.hi!.slice(4 + i * 16, 3).toString()
            });
        }
        return this;
    }
}
