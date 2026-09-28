import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 scores (2 bytes, hex digits, x100), then the names (8 ASCII characters, 00 blank). The MAME 0.289
// hiscore.dat entry saves 35 bytes of names: only the first 3 characters of the 5th. Default scores are
// all 0 without names. Checked with modified files loaded by the hiscore plugin (SCORE RANKING TABLE).
@Extractor({
    name: 'fcombat'
})
export default class Fcombat extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 2, 2).toHexNumber() * 100,
                name: this.hi!.slice(10 + i * 8, i < 4 ? 8 : 3).toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
