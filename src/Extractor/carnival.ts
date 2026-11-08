import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The game ranks 30 scores in tens (2 BCD bytes, least significant first) and names the top 3 (3 ASCII
// letters each, after the 60 bytes of scores); only those 3 are on screen. Checked on the game's screen
// (MAME 0.289) with a modified file (12 34, 56 01, 02 03 and ABCDEFGHI show ABC 34120, DEF 01560,
// GHI 03020).
@Extractor({
    name: 'carnival'
})
export default class Carnival extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 3; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 2, 2).reverse().toHexNumber() * 10,
                name: this.hi!.slice(60 + i * 3, 3).toString()
            });
        }
        return this;
    }
}
