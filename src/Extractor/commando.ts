import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING BEST 7: rows of 13 bytes, the score in 3 BCD bytes (tens not stored), then 10 characters in
// ASCII, dots filling the end as on screen ("VULGUS...."); the top score follows. Checked on the game's
// screen (MAME 0.289) with a modified file (09 87 65 shows 987650, ZAQ).
@Extractor({
    name: 'commando'
})
export default class Commando extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 7; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 13, 3).toHexNumber() * 10,
                name: this.hi!.slice(i * 13 + 3, 10).toString()
            });
        }
        return this;
    }
}
