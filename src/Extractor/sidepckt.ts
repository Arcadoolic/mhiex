import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 10 PLAYERS: 10 records of 5 bytes: score (2 bytes, hex digits, x100), name (3 ASCII characters).
// Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'sidepckt'
})
export default class Sidepckt extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 5, 2).toHexNumber() * 100,
                name: this.hi!.slice(i * 5 + 2, 3).toString().trim()
            });
        }
        return this;
    }
}
