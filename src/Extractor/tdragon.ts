import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// THE BEST PLAYERS: 12 rows of 16 bytes, the score in 4 BCD bytes, the stage (16-bit), 2 bytes, then
// the name on 8 characters (0x6A is A, 0x20 blank; 0x84 "?", 0x93 "+", 0x97 "&", 0x94 ":", 0x92 a
// circled a, given as "@"). Checked on the game's screen (MAME 0.289) with a modified file (00 98 76
// 54, stage 7, ZAQXYBCD shows 987654 7 ZAQXYBCD).
@Extractor({
    name: 'tdragon'
})
export default class Tdragon extends AbstractExtractor {
    protected charset = {
        0x20: ' ',
        0x84: '?',
        0x92: '@',
        0x93: '+',
        0x94: ':',
        0x97: '&',
    };

    extract(): this {
        for (let i = 0; i < 12; i++) {
            const row = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 4).toHexNumber(),
                name: this.hi!.slice(row + 8, 8).toString(this.charset, -0x29).trimEnd(),
                extra: {
                    stage: this.hi!.slice(row + 4, 2).buffer.readUInt16BE(0)
                }
            });
        }
        return this;
    }
}
