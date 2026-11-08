import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 scores (3 BCD bytes each, least significant first), the top score, then 5 names of 3 characters
// (0x21 is A, 0x3B is the dot of "N.T"). Checked on the game's screen (MAME 0.289) with a modified
// file (50 76 98 shows 987650, Z.A).
@Extractor({
    name: 'mmonkey'
})
export default class Mmonkey extends AbstractExtractor {
    protected charset = {
        0x3B: '.',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 3, 3).reverse().toHexNumber(),
                name: this.hi!.slice(18 + i * 3, 3).toString(this.charset, 0x20)
            });
        }
        return this;
    }
}
