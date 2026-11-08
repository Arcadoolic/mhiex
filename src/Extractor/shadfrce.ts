import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 rows of 8 bytes: the score in 4 BCD bytes, the 3 letters in ASCII, then the character the player
// chose (index of the portrait shown next to the name); the top score follows (4 BCD bytes). Checked on
// the game's screen (MAME 0.289) with a modified file (09 87 65 40 shows 09876540, ZAQ).
@Extractor({
    name: 'shadfrce'
})
export default class Shadfrce extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 3).toString(),
                extra: {
                    character: this.hi!.slice(i * 8 + 7, 1).readIntBE()
                }
            });
        }
        return this;
    }
}
