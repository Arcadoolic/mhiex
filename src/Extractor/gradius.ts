import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 14 bytes: 00, zodiac sign (0 = Aries), name (8 bytes, only the first 3 shown: A = 1,
// 0x1B '-', 0x1C '.'), 00, score (3 bytes, hex digits). Checked against the game's ranking screens
// (MAME 0.289), and with a modified file loaded by the hiscore plugin.
@Extractor({
    name: 'gradius'
})
export default class Gradius extends AbstractExtractor {
    protected charset = {0x00: ' ', 0x1B: '-', 0x1C: '.'};

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 14 + 11, 3).toHexNumber(),
                name: this.hi!.slice(i * 14 + 2, 3).toString(this.charset, 64).trim()
            });
        }
        return this;
    }
}
