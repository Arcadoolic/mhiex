import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'cbuster'
})
export default class Cbuster extends AbstractExtractor {
    // BEST SCORES: 10 scores (4 BCD bytes), the game keeps no name
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber(),
                name: ''
            });
        }
        return this;
    }
}
