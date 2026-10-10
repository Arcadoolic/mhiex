import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'brkthru'
})
export default class Brkthru extends AbstractExtractor {
    // Tiles: blank 0x00, letters from 0x24
    protected charset = {
        0x00: ' ',
    };

    // BEST 5 PLAYERS: 5 scores (4 BCD bytes), 4 bytes, 5 names, then the top score
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber(),
                name: this.hi!.slice(24 + i * 3, 3).toString(this.charset, 0x1D)
            });
        }
        return this;
    }
}
