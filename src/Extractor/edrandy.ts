import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'edrandy'
})
export default class Edrandy extends AbstractExtractor {
    // MAX POWER RANKING: records of 8 bytes, name (3 characters and a null byte) and score
    // (4 BCD bytes). The file holds 16, the game shows 15.
    extract(): this {
        for (let i = 0; i < 15; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8 + 4, 4).toHexNumber(),
                name: this.hi!.slice(i * 8, 3).toString()
            });
        }
        return this;
    }
}
