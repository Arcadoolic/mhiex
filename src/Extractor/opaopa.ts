import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'opaopa'
})
export default class Opaopa extends AbstractExtractor {
    // Tiles: digits from 0x01, letters from 0x0B
    protected charset = {
        0x01: '0', 0x02: '1', 0x03: '2', 0x04: '3', 0x05: '4',
        0x06: '5', 0x07: '6', 0x08: '7', 0x09: '8', 0x0A: '9',
        0x25: '.',
        0x26: '©',
        0x28: '$',
        0x29: '&',
    };

    // TODAY'S BEST: 8 records of 7 bytes, score (4 BCD bytes) and name. Then the top score.
    extract(): this {
        for (let i = 0; i < 8; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 7, 4).toHexNumber(),
                name: this.hi!.slice(i * 7 + 4, 3).toString(this.charset, 0x36)
            });
        }
        return this;
    }
}
