import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 scores (3 bytes, hex digits, x10), then 5 names of 3 characters, then the top score. Checked
// against the game's HEROES screen (MAME 0.289).
@Extractor({
    name: 'cobracom'
})
export default class Cobracom extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 3, 3).toHexNumber() * 10,
                name: this.hi!.slice(15 + i * 3, 3).toString()
            });
        }
        return this;
    }
}
