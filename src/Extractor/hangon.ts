import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score (4 bytes), then the BEST 7 SCORES: 7 records of 12 bytes, score (4 bytes, hex
// digits), name (4 ASCII characters), time (4 bytes, empty by default). Checked against the game's
// BEST 7 SCORES screen (MAME 0.289).
@Extractor({
    name: 'hangon'
})
export default class Hangon extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 7; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 12, 4).toHexNumber(),
                name: this.hi!.slice(4 + i * 12 + 4, 4).toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
