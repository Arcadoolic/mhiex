import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'actfancr'
})
export default class Actfancr extends AbstractExtractor {
    // TOP5 RANKING: 5 scores (3 BCD bytes, tens dropped), 5 names, then the top score
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 3, 3).toHexNumber() * 10,
                name: this.hi!.slice(15 + i * 3, 3).toString()
            });
        }
        return this;
    }
}
