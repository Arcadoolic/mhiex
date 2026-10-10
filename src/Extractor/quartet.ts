import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'quartet'
})
export default class Quartet extends AbstractExtractor {
    // SUPER PLAYERS: 99 records of 8 bytes, score (4 BCD bytes), name and a null byte
    extract(): this {
        for (let i = 0; i < 99; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 3).toString()
            });
        }
        return this;
    }
}
