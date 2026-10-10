import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'ddux'
})
export default class Ddux extends AbstractExtractor {
    // BEST FRIENDS: 10 records of 16 bytes, score (4 BCD bytes), name (4 characters), 8 bytes
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 16, 4).toHexNumber(),
                name: this.hi!.slice(i * 16 + 4, 4).toString().trimEnd()
            });
        }
        return this;
    }
}
