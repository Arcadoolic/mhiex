import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'tigerh'
})
export default class Tigerh extends AbstractExtractor {
    // EXCELLENT PLAYERS: the top score, 10 scores (3 BCD bytes, tens dropped), 10 names (tiles,
    // letters from 0x0A), 10 areas
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(3 + i * 3, 3).toHexNumber() * 10,
                name: this.hi!.slice(33 + i * 3, 3).toString({}, 0x37),
                extra: {
                    area: this.hi!.buffer[63 + i]
                }
            });
        }
        return this;
    }
}
