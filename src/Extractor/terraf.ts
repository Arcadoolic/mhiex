import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 10: 10 scores (3 bytes, hex digits, x100), then 10 names (3 ASCII characters); then the top
// score. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'terraf'
})
export default class Terraf extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 3, 3).toHexNumber() * 100,
                name: this.hi!.slice(30 + i * 3, 3).toString().trim()
            });
        }
        return this;
    }
}
