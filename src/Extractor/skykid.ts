import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// SKYKID TOPS: the top score (4 BCD bytes), then 5 rows of 13 bytes: the score in 4 BCD bytes, the
// medals column, then the name on 8 characters (0x0A is A, 0x2F blank). Checked on the game's screen
// (MAME 0.289) with a modified file (00 98 76 50, 07, ZAQ shows 987650 7 ZAQ).
@Extractor({
    name: 'skykid'
})
export default class Skykid extends AbstractExtractor {
    protected charset = {
        0x2F: ' ',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const row = 4 + i * 13;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 4).toHexNumber(),
                name: this.hi!.slice(row + 5, 8).toString(this.charset, 0x37).trimEnd(),
                extra: {
                    medals: this.hi!.slice(row + 4, 1).readIntBE()
                }
            });
        }
        return this;
    }
}
