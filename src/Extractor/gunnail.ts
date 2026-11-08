import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOTAL HIGH SCORES: 7 rows of 16 bytes, the score in 4 BCD bytes, the stage reached (16-bit), 2 bytes,
// then 3 ASCII letters on 16-bit words. The STAGE HIGH SCORES that follow are not read. Checked on the
// game's screen (MAME 0.289) with a modified file (00 98 76 54, stage 5, ZAQ shows STAGE5 987654 ZAQ).
@Extractor({
    name: 'gunnail'
})
export default class Gunnail extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 7; i++) {
            const row = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 4).toHexNumber(),
                name: [9, 11, 13].map(o => String.fromCharCode(this.hi!.buffer[row + o])).join(''),
                extra: {
                    stage: this.hi!.slice(row + 4, 2).buffer.readUInt16BE(0)
                }
            });
        }
        return this;
    }
}
