import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'robocop2'
})
export default class Robocop2 extends AbstractExtractor {
    // THE BEST LAW ENFORCERS: 10 names (3 characters and a null byte), 10 scores (3 BCD bytes and
    // a null byte), then the top score
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(40 + i * 4, 3).toHexNumber(),
                name: this.hi!.slice(i * 4, 3).toString()
            });
        }
        return this;
    }
}
