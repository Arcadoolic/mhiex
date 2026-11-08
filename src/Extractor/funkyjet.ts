import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 16 words of row order (the high byte of the word at each rank is the row shown there), then 10 rows of
// 32 bytes copied from the screen's tile map: each character is a pair (attribute, tile). From the row's
// first byte (file offset 0x1F): 3 letters at +1, +3, +5 (0x0D is A), the score's 5 digits at +11 to +19
// (a blank leading digit has tile 00 and attribute 00), the stage at +21 and +25 (8-0 is shown ALL).
// Checked on the game's screen (MAME 0.289) with a modified file: swapping the first two order words shows
// TLF first and the modified row (ZAQ, 9 8 7 6 5, 3 4) second as ZAQ 98765 3- 4.
@Extractor({
    name: 'funkyjet'
})
export default class Funkyjet extends AbstractExtractor {
    extract(): this {
        const data = this.hi!.buffer;
        for (let i = 0; i < 10; i++) {
            const row = 0x1F + data[i * 2] * 32;
            let score = 0;
            for (let d = 0; d < 5; d++) {
                score = score * 10 + data[row + 11 + d * 2];
            }
            this.output.default.push({
                rank: i + 1,
                score,
                name: [1, 3, 5].map(o => String.fromCharCode(data[row + o] + 0x34)).join(''),
                extra: {
                    stage: `${data[row + 21]}-${data[row + 25]}`
                }
            });
        }
        return this;
    }
}
