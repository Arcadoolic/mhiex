import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 rows of 8 bytes: the score in 3 BCD bytes, least significant first, 2 bytes the screen does not
// show, then the 3 letters in ASCII; the top score follows (3 BCD bytes). Checked on the game's screen
// (MAME 0.289) with a modified file: 00 09 87 shows 870900, 12 34 56 as top score shows 563412.
@Extractor({
    name: 'renegade'
})
export default class Renegade extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 3).reverse().toHexNumber(),
                name: this.hi!.slice(i * 8 + 5, 3).toString()
            });
        }
        return this;
    }
}
