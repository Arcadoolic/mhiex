import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING LIST: 10 scores, no names. After 30 bytes the screen does not use, 10 scores in 3 BCD bytes,
// then 13 bytes of the BEST 5 display. Checked on the game's screen (MAME 0.289) with a modified file
// (01 23 45 and 00 67 89 show 12345 and 6789 first).
@Extractor({
    name: 'turbo'
})
export default class Turbo extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({rank: i + 1, score: this.hi!.slice(0x1E + i * 3, 3).toHexNumber(), name: ''});
        }
        return this;
    }
}
