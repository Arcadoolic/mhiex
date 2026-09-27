import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 5 FIGHTERS: 5 records of 12 bytes: score (6 bytes, hex digits), name (3 ASCII characters), 00,
// wins, 00. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'nwarr'
})
export default class Nwarr extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 12, 6).toHexNumber(),
                name: this.hi!.slice(i * 12 + 6, 3).toString().trim(),
                extra: {wins: this.hi!.slice(i * 12 + 10, 1).toHexNumber()}
            });
        }
        return this;
    }
}
