import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 records of 17 bytes: score (9 bytes, one digit each, x10), name (8 ASCII characters; the default
// ones are all HI-SCORE). Checked against the game's ranking screen (MAME 0.289), and with a modified
// file loaded by the hiscore plugin (digits 0-8 show 123456780).
@Extractor({
    name: 'empcity'
})
export default class Empcity extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 17, 9).hexDigits('odd')) * 10,
                name: this.hi!.slice(i * 17 + 9, 8).toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
