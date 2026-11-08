import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP 5: rows of 8 bytes, the score in 4 BCD bytes, 3 letters (0xD0 is A), then the round reached; the
// top score follows. Checked on the game's screen (MAME 0.289) with a modified file (00 98 76 50, ZAQ
// shows 987650 ZAQ).
@Extractor({
    name: 'ordyne'
})
export default class Ordyne extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 3).toString({}, -0x8F),
                extra: {
                    round: this.hi!.slice(i * 8 + 7, 1).readIntBE()
                }
            });
        }
        return this;
    }
}
