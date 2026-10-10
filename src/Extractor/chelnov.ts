import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'chelnov'
})
export default class Chelnov extends AbstractExtractor {
    // Ranking: the top score, 11 scores (4 BCD bytes), then 11 names (3 characters and a null
    // byte). The game shows the first as CHAMP and numbers the others from 1 to 10.
    extract(): this {
        for (let i = 0; i < 11; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(48 + i * 4, 3).toString()
            });
        }
        return this;
    }
}
