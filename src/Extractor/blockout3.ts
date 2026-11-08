import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP 10 SCORES: 10 names of 4 bytes (3 letters, 0x1F is A, 0x1E is "?", then 00), 10 scores (4 BCD
// bytes), 10 face counts (4 BCD bytes), then the top score. Checked on the game's screen (MAME 0.289)
// with a modified file (ZAQ 09 87 65 43 and 00 00 12 34 shows ZAQ 9876543 1234, XY? next).
@Extractor({
    name: 'blockout3'
})
export default class Blockout3 extends AbstractExtractor {
    protected charset = {
        0x1E: '?',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(40 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(i * 4, 3).toString(this.charset, 0x22),
                extra: {
                    faces: this.hi!.slice(80 + i * 4, 4).toHexNumber()
                }
            });
        }
        return this;
    }
}
