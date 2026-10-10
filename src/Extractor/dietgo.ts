import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'dietgo'
})
export default class Dietgo extends AbstractExtractor {
    // BEST PLAYERS: the top score, then 30 records of 8 bytes, name (3 characters and a space)
    // and score (4 BCD bytes). hiscore.dat stops one byte short: the last score only has its
    // first 3 bytes, followed by a marker byte.
    extract(): this {
        for (let i = 0; i < 30; i++) {
            this.output.default.push({
                rank: i + 1,
                score: i < 29 ? this.hi!.slice(8 + i * 8, 4).toHexNumber() : this.hi!.slice(8 + i * 8, 3).toHexNumber() * 100,
                name: this.hi!.slice(4 + i * 8, 3).toString()
            });
        }
        return this;
    }
}
