import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 records of 16 bytes: score (6 bytes, one digit each), name (10 ASCII characters, 00 blank), then
// the top score. Checked against the game's SCORE RANKING screen (MAME 0.289), and with a modified
// file loaded by the hiscore plugin (01 02 03 04 05 shows 12345).
@Extractor({
    name: 'guzzler'
})
export default class Guzzler extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 16, 6).hexDigits('odd')),
                name: this.hi!.slice(i * 16 + 6, 10).toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
