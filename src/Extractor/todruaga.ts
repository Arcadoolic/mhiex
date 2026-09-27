import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 5: 5 records of 10 bytes: score (3 bytes, hex digits, x10), 00, floor, name (5 ASCII characters,
// '[' shows '.'); then the top score. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'todruaga'
})
export default class Todruaga extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const o = i * 10;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 3).toHexNumber() * 10,
                name: this.hi!.slice(o + 5, 5).toString({0x5B: '.'}).trim(),
                extra: {floor: this.hi!.slice(o + 4, 1).toHexNumber()}
            });
        }
        return this;
    }
}
