import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 10 bytes: score (4 bytes, hex digits), name (3 characters of 2 bytes: digits 0-9, A =
// 0x11, 0x2C '.'); then the top score. Checked against the game's BEST 10 PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'lifefrce'
})
export default class Lifefrce extends AbstractExtractor {
    protected charset = {0x2C: '.', 0x10: ' '};

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 10, 4).toHexNumber(),
                name: this.hi!.slice(i * 10 + 4, 6).byteSkip(false).toString(this.charset, 0x30).trim()
            });
        }
        return this;
    }
}
