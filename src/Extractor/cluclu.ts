import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 8 bytes: name (3, A = 0x0A), 00, score (3 bytes, hex digits), separator; the top
// score overlaps the end. Checked against the game's TOP 10 PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'cluclu'
})
export default class Cluclu extends AbstractExtractor {
    protected charset = {
        0xAF: '.',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8 + 4, 3).toHexNumber(),
                name: this.hi!.slice(i * 8, 3).toString(this.charset, 55)
            });
        }
        return this;
    }
}
