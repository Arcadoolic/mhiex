import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'supbtime'
})
export default class Supbtime extends AbstractExtractor {
    // BEST PLAYERS: 10 scores (4 BCD bytes), then 10 names (a null byte and 3 characters)
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber(),
                name: this.hi!.slice(41 + i * 4, 3).toString()
            });
        }
        return this;
    }
}
