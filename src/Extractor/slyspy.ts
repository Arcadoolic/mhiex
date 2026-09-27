import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score, then BEST PLAYERS: 20 scores (4 bytes, hex digits), then 20 names (3 ASCII
// characters, digits by default, then 00). Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'slyspy'
})
export default class Slyspy extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 20; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(84 + i * 4, 3).toString().trim()
            });
        }
        return this;
    }
}
