import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 names of 8 ASCII characters, then for each rank a pointer to its name, 5 scores (4 BCD bytes), and
// for each rank a pointer to its score. Pointers are 68000 addresses: FFFFEC70 is the table's first byte
// (the 24-bit bus ignores the top byte). The screen ranks the first 4 (TOP, 2ND, 3RD, 4TH). Checked on
// the game's screen (MAME 0.289) with a modified file: pointing rank 1 at the third name shows MASATUGU
// on top, 00 98 76 50 shows 987650.
@Extractor({
    name: 'tigeroad'
})
export default class Tigeroad extends AbstractExtractor {
    private static readonly BASE = 0xFFEC70;

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const name = (this.hi!.slice(0x28 + i * 4, 4).buffer.readUInt32BE(0) & 0xFFFFFF) - Tigeroad.BASE;
            const score = (this.hi!.slice(0x50 + i * 4, 4).buffer.readUInt32BE(0) & 0xFFFFFF) - Tigeroad.BASE;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(score, 4).toHexNumber(),
                name: this.hi!.slice(name, 8).toString().trimEnd()
            });
        }
        return this;
    }
}
