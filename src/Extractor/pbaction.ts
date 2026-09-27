import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'pbaction'
})
export default class Pbaction extends AbstractExtractor {
    protected charset = {
        0x3a: '.'
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            // One decimal digit per byte, least significant first, last digit (always 0) not stored
            const digits = this.hi!.slice(i * 8, 8).buffer;
            let score = 0;
            for (let d = digits.length - 1; d >= 0; d--) {
                score = score * 10 + digits[d];
            }
            this.output.default.push({
                rank: i + 1,
                score: score * 10,
                name: this.hi!.slice(0x51 + i * 4, 3).toString(this.charset)
            });
        }
        return this;
    }
}
