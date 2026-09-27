import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 records of 8 bytes: score (4 bytes, hex digits), name (3, ASCII with 03 = '.'), zone (1).
// Checked against the game's BEST 5 screen (MAME 0.289).
@Extractor({
    name: 'cop01'
})
export default class Cop01 extends AbstractExtractor {
    protected charset = {
        0x03: '.',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 3).toString(this.charset),
                extra: {
                    zone: this.hi!.buffer[i * 8 + 7]
                }
            });
        }
        return this;
    }
}
