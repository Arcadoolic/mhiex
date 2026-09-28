import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST SWEEPERS: 5 records of 16 bytes: bounty (4 bytes, little-endian hex digits), name (3 ASCII
// characters), character, coins (hex digits), FF padding (cut from the 5th record by the MAME 0.289
// hiscore.dat entry). Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'uccops'
})
export default class Uccops extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const o = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 4).reverse().toHexNumber(),
                name: this.hi!.slice(o + 4, 3).toString().trim(),
                extra: {coins: this.hi!.slice(o + 8, 1).toHexNumber()}
            });
        }
        return this;
    }
}
