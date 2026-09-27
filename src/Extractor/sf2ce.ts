import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING: 5 records of 8 bytes: score (4 bytes, hex digits), name (3 ASCII characters), space. Checked
// against the game's screen (MAME 0.289).
@Extractor({
    name: 'sf2ce'
})
export default class Sf2ce extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 3).toString().trim()
            });
        }
        return this;
    }
}
