import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'lnc'
})
export default class Lnc extends AbstractExtractor {
    // Tiles: blank 0x00 (the default names), letters from 0x0B
    protected charset = {
        0x00: ' ',
    };

    // BEST FIVE PLAYERS: the top score, 5 scores (3 BCD bytes), then 5 names
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(3 + i * 3, 3).toHexNumber(),
                name: this.hi!.slice(18 + i * 3, 3).toString(this.charset, 0x36).trimEnd()
            });
        }
        return this;
    }
}
