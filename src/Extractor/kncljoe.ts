import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 records of 9 bytes: score (3 bytes, hex digits, x10), name (6 ASCII characters). Checked against the
// game's BEST 5 PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'kncljoe'
})
export default class Kncljoe extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 9, 3).toHexNumber() * 10,
                name: this.hi!.slice(i * 9 + 3, 6).toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
