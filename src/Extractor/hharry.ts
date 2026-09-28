import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 16 bytes: score (3 bytes, little-endian hex digits, x10), name (12 ASCII characters),
// 00; then the top score. Checked against the game's BEST 10 RANKING screen (MAME 0.289), and with a
// modified file loaded by the hiscore plugin (56 34 12 shows 1234560).
@Extractor({
    name: 'hharry'
})
export default class Hharry extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 16, 3).reverse().toHexNumber() * 10,
                name: this.hi!.slice(i * 16 + 3, 12).toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
