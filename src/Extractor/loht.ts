import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 records of 10 bytes: score (2 bytes, little-endian hex digits, x100), name (8 ASCII characters);
// then the top score. The game's BEST 3 PLAYERS screen shows the first 3 (checked in MAME 0.289).
@Extractor({
    name: 'loht'
})
export default class Loht extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 10, 2).reverse().toHexNumber() * 100,
                name: this.hi!.slice(i * 10 + 2, 8).toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
