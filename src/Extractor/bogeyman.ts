import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score (3 BCD bytes, least significant first, tens not stored), then 5 rows of 16 bytes: the
// score the same way, the house reached (1 BCD byte), 4 unused bytes, the 7-letter name (0x0B is A)
// and a padding byte. Checked on the game's screen (MAME 0.289) with a modified file
// (65 87 09 shows 987650, house 23, ZAQUIET).
@Extractor({
    name: 'bogeyman'
})
export default class Bogeyman extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const row = 3 + i * 16;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 3).reverse().toHexNumber() * 10,
                name: this.hi!.slice(row + 8, 7).toString({}, 0x36),
                extra: {
                    house: this.hi!.slice(row + 3, 1).toHexNumber()
                }
            });
        }
        return this;
    }
}
