import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 8 records of 16 bytes: score (4 bytes, hex digits), area - 1, name (3 ASCII characters), 00, spell
// ('-' when none), padding; then the top score. Checked against the game's ranking screen (MAME 0.289).
@Extractor({
    name: 'lomakai'
})
export default class Lomakai extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 8; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 16, 4).toHexNumber(),
                name: this.hi!.slice(i * 16 + 5, 3).toString({0x00: ' '}).trim(),
                extra: {area: this.hi!.buffer[i * 16 + 4] + 1}
            });
        }
        return this;
    }
}
