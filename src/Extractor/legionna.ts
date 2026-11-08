import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 5: rows of 14 bytes, 3 letters (01 is A) and 00, the score in 4 BCD bytes, the stage (16-bit),
// then the portrait and another word. Checked on the game's screen (MAME 0.289) with a modified file
// (1A 01 11, 09 87 65 43, stage 4 shows 9876543 ZAQ 4).
@Extractor({
    name: 'legionna'
})
export default class Legionna extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const row = i * 14;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row + 4, 4).toHexNumber(),
                name: this.hi!.slice(row, 3).toString({}, 0x40),
                extra: {
                    stage: this.hi!.slice(row + 8, 2).buffer.readUInt16BE(0)
                }
            });
        }
        return this;
    }
}
