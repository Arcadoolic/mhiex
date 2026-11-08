import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 rows of 6 bytes: the score in 3 BCD bytes, least significant first, tens not stored, then 3
// letters (0xBB is A); the top score follows. Checked on the game's screen (MAME 0.289) with a
// modified file (09 87 65 shows 6587090, ZAQ as champion).
@Extractor({
    name: 'maniach'
})
export default class Maniach extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 6, 3).reverse().toHexNumber() * 10,
                name: this.hi!.slice(i * 6 + 3, 3).toString({0xB0: ' '}, -0x7A)
            });
        }
        return this;
    }
}
