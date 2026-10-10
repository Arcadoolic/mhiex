import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'fantzone'
})
export default class Fantzone extends AbstractExtractor {
    // 7 records of 8 bytes: score (4 BCD bytes), round, name. Then the top score.
    extract(): this {
        for (let i = 0; i < 7; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 5, 3).toString(),
                extra: {
                    round: this.hi!.slice(i * 8 + 4, 1).toHexNumber()
                }
            });
        }
        return this;
    }
}
