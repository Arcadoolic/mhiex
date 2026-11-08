import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST PLAYERS: the top score (4 BCD bytes), then 20 scores in 4 BCD bytes and 20 names of 4 bytes (3
// ASCII characters, digits in the default table, and 00). Checked on the game's screen (MAME 0.289)
// with a modified file (00 98 76 54 and "ZAQ" show 1 ZAQ 987654).
@Extractor({
    name: 'secretag'
})
export default class Secretag extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 20; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(0x54 + i * 4, 3).toString()
            });
        }
        return this;
    }
}
