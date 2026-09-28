import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TODAY'S HIGH SCORE: 3 scores (3 bytes, hex digits), no names. Checked against the game's screen
// (MAME 0.289), and with a modified file loaded by the hiscore plugin (01 23 45 shows 12345).
@Extractor({
    name: 'route16'
})
export default class Route16 extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 3; i++) {
            this.output.default.push({rank: i + 1, score: this.hi!.slice(i * 3, 3).toHexNumber(), name: ''});
        }
        return this;
    }
}
