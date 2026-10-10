import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'flicky'
})
export default class Flicky extends AbstractExtractor {
    protected charset = {
        0x5C: '.',
    };

    // 7 scores (3 BCD bytes, tens dropped), 7 rounds, 7 names, then the top score
    extract(): this {
        for (let i = 0; i < 7; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 3, 3).toHexNumber() * 10,
                name: this.hi!.slice(28 + i * 3, 3).toString(this.charset),
                extra: {
                    round: this.hi!.slice(21 + i, 1).toHexNumber()
                }
            });
        }
        return this;
    }
}
