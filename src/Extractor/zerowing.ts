import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'zerowing'
})
export default class Zerowing extends AbstractExtractor {
    // Tiles: digits from 0x00, letters from 0x0A
    protected charset = {
        0x00: '0', 0x01: '1', 0x02: '2', 0x03: '3', 0x04: '4',
        0x05: '5', 0x06: '6', 0x07: '7', 0x08: '8', 0x09: '9',
        0x25: ',',
        0x26: '.',
    };

    // TOP 5 PLAYERS: the top score, 5 scores (4 BCD bytes, tens dropped), 5 names (6 words each,
    // the game shows the first 3), then the area as 5 words and 5 more (shown as "6-20")
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber() * 10,
                name: this.hi!.slice(24 + i * 12, 6).byteSkip(false).toString(this.charset, 0x37),
                extra: {
                    area: `${this.hi!.buffer[85 + i * 2]}-${this.hi!.buffer[95 + i * 2]}`
                }
            });
        }
        return this;
    }
}
