import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING: 5 rows of 8 bytes, the score in 4 BCD bytes, 3 letters (00 is A), then the character
// (index of the portrait). Checked on the game's screen (MAME 0.289) by writing a modified table to
// RAM (00 98 76 50, 19 00 10 shows 987650 ZAQ). MAME's hiscore.dat entry for kod expects 01 as first
// byte where the game's RAM holds 00, so the plugin never loads nor saves this table with it.
@Extractor({
    name: 'kod'
})
export default class Kod extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 3).toString({}, 0x41),
                extra: {
                    character: this.hi!.slice(i * 8 + 7, 1).readIntBE()
                }
            });
        }
        return this;
    }
}
