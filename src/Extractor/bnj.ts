import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'bnj'
})
export default class Bnj extends AbstractExtractor {
    // BEST 5 PLAYERS: the top score, 5 scores (3 BCD bytes), and further in the same block of
    // memory the 5 names (letters from 0x3B)
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(3 + i * 3, 3).toHexNumber(),
                name: this.hi!.slice(323 + i * 3, 3).toString({}, 6)
            });
        }
        return this;
    }
}
