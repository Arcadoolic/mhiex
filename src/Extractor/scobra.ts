import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// SCORE RANKING: 10 scores (3 bytes, little-endian hex digits), no names; then the top score. Checked
// against the game's screen (MAME 0.289), and with a modified file loaded by the hiscore plugin
// (56 34 12 shows 123456).
// The game only puts a score in its ranking at game over, while the top score follows the game
// being played: quit before the end, the file holds a top score its ranking does not have. It is
// then given first, and the ranking's last score left out.
@Extractor({
    name: 'scobra'
})
export default class Scobra extends AbstractExtractor {
    extract(): this {
        const scores: number[] = [];
        for (let i = 0; i < 10; i++) {
            scores.push(this.hi!.slice(i * 3, 3).reverse().toHexNumber());
        }
        const top = this.hi!.slice(30, 3).reverse().toHexNumber();
        if (top > scores[0]) {
            scores.unshift(top);
            scores.pop();
        }
        scores.forEach((score, i) => this.output.default.push({rank: i + 1, score, name: ''}));
        return this;
    }
}
