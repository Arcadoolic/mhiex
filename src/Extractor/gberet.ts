import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 scores (3 BCD bytes), then 10 names of 3 letters (0x11 is A); the screen ranks the first 5. The
// top score follows. Checked on the game's screen (MAME 0.289) with a modified file (09 87 65 shows
// 98765, ZAQ; 01 23 45 XYZ second).
@Extractor({
    name: 'gberet'
})
export default class Gberet extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 3, 3).toHexNumber(),
                name: this.hi!.slice(30 + i * 3, 3).toString({}, 0x30)
            });
        }
        return this;
    }
}
