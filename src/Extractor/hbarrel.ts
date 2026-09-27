import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 scores (4 bytes, hex digits), 1 unused score, then 10 names (00 then 3 ASCII characters).
// Checked against the game's BEST PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'hbarrel'
})
export default class Hbarrel extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber(),
                name: this.hi!.slice(48 + i * 4 + 1, 3).toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
