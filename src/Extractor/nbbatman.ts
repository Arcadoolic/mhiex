import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 8 bytes: score (3 bytes, little-endian hex digits), name (3 ASCII characters),
// character, 00 (cut from the 10th record by the MAME 0.289 hiscore.dat entry). Checked against the
// game's SCORE RANKING screen (MAME 0.289).
@Extractor({
    name: 'nbbatman'
})
export default class Nbbatman extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 3).reverse().toHexNumber(),
                name: this.hi!.slice(i * 8 + 3, 3).toString().trim()
            });
        }
        return this;
    }
}
