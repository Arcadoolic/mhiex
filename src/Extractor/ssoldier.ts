import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// SCORE RANKING: 5 records of 7 bytes: score (2 bytes, little-endian hex digits, x100), 2 bytes, name
// (3 ASCII characters); then the top score. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'ssoldier'
})
export default class Ssoldier extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const o = i * 7;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 2).reverse().toHexNumber() * 100,
                name: this.hi!.slice(o + 4, 3).toString().trim()
            });
        }
        return this;
    }
}
