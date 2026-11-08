import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANK BEST 10: rows of 6 bytes, the score in 2 BCD bytes (hundreds, the screen adds 00), the stage,
// then 3 letters (0x11 is A). Checked on the game's screen (MAME 0.289) with a modified file (98 76
// shows 987600, stage 7, ZAQ).
@Extractor({
    name: 'hcastle'
})
export default class Hcastle extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 6, 2).toHexNumber() * 100,
                name: this.hi!.slice(i * 6 + 3, 3).toString({}, 0x30),
                extra: {
                    stage: this.hi!.slice(i * 6 + 2, 1).readIntBE()
                }
            });
        }
        return this;
    }
}
