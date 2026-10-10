import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'srdarwin'
})
export default class Srdarwin extends AbstractExtractor {
    // BEST 10: 10 scores (4 BCD bytes), 10 names, then the top score
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber(),
                name: this.hi!.slice(40 + i * 3, 3).toString()
            });
        }
        return this;
    }
}
