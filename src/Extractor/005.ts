import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: '005'
})
export default class Extractor005 extends AbstractExtractor {
    extract(): this {
        // 1 header byte, then 5 scores of 2 bytes (little-endian hex digits, x10). The game keeps no names.
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(1 + i * 2, 2).reverse().toHexNumber() * 10,
                name: ''
            });
        }
        return this;
    }
}
