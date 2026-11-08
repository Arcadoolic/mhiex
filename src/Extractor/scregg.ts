import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 rows of 6 bytes: 3 characters (0x0B is A, 0x25 the dot of "M.O"), then the score in 3 BCD bytes,
// least significant first; the top score follows. Checked on the game's screen (MAME 0.289) with a
// modified file (50 76 98 shows 987650, Z.A and QXY).
@Extractor({
    name: 'scregg'
})
export default class Scregg extends AbstractExtractor {
    protected charset = {
        0x25: '.',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 6 + 3, 3).reverse().toHexNumber(),
                name: this.hi!.slice(i * 6, 3).toString(this.charset, 0x36)
            });
        }
        return this;
    }
}
