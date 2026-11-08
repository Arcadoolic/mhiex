import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 37 bytes the ranking does not use (the top score drawn as characters), then 20 rows of 8 bytes: the
// score in 4 BCD bytes, 3 ASCII letters and the area (one nibble each, 13 is 1-3). Checked on the game's
// screen (MAME 0.289) with a modified file (09 87 65 43 ZAQ 24 shows ZAQ 9876543 2-4).
@Extractor({
    name: 'bloodbro'
})
export default class Bloodbro extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 20; i++) {
            const row = 0x25 + i * 8;
            const area = this.hi!.buffer[row + 7];
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 4).toHexNumber(),
                name: this.hi!.slice(row + 4, 3).toString(),
                extra: {
                    area: `${area >> 4}-${area & 0x0F}`
                }
            });
        }
        return this;
    }
}
