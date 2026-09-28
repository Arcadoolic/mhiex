import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 records of 13 bytes: score (3 bytes, hex digits, x100), name (10 ASCII characters, '?' shows
// '.'); then the top score. Checked against the game's BEST 5 screen (MAME 0.289).
@Extractor({
    name: 'ninjemak'
})
export default class Ninjemak extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 13, 3).toHexNumber() * 100,
                name: this.hi!.slice(i * 13 + 3, 10).toString({0x3F: '.'}).trim()
            });
        }
        return this;
    }
}
