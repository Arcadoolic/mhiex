import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'wb3'
})
export default class Wb3 extends AbstractExtractor {
    protected charset = {
        0x5B: '.',
    };

    // BEST 5: 5 records of 8 bytes, name, round (binary) and score (4 BCD bytes, tens dropped)
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8 + 4, 4).toHexNumber() * 10,
                name: this.hi!.slice(i * 8, 3).toString(this.charset),
                extra: {
                    round: this.hi!.buffer[i * 8 + 3]
                }
            });
        }
        return this;
    }
}
