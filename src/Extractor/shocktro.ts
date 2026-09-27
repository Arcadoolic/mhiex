import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING: 5 records of 8 bytes: score (4 bytes, hex digits), name (3 characters, A = 0, step 2), 00
// (cut from the 5th record by the MAME 0.289 hiscore.dat entry). Checked against the game's screen
// (MAME 0.289).
@Extractor({
    name: 'shocktro'
})
export default class Shocktro extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 3).toString({}, 0x41, 2).trim()
            });
        }
        return this;
    }
}
