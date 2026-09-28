import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score (3 bytes), then 7 records of 16 bytes: score (7 ASCII digits), space, name (3 ASCII
// characters, not shown by the game), padding, then the next rank. Checked against the game's SCORE
// screen (MAME 0.289).
@Extractor({
    name: 'mnchmobl'
})
export default class Mnchmobl extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 7; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(3 + i * 16, 7).toString()),
                name: this.hi!.slice(11 + i * 16, 3).toString().trim()
            });
        }
        return this;
    }
}
