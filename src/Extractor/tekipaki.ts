import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'tekipaki'
})
export default class Tekipaki extends AbstractExtractor {
    // Tiles, once the name byte is halved: digits from 0x0B, letters from 0x15
    protected charset = {
        0x0B: '0', 0x0C: '1', 0x0D: '2', 0x0E: '3', 0x0F: '4',
        0x10: '5', 0x11: '6', 0x12: '7', 0x13: '8', 0x14: '9',
        0x2F: '&',
        0x30: '-',
        0x31: ',',
        0x32: '.',
        0x33: '?',
    };

    // RANKING OF TODAY: the top score, 5 scores (4 BCD bytes, the last digit not shown), 5 levels
    // (the high byte of a word), then 5 names of 3 tiles (the high byte of a word, twice the
    // tile number; the file stops before the last low byte)
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber() / 10,
                name: this.hi!.slice(34 + i * 6, 6).byteSkip(true).byteMap(byte => byte >> 1).toString(this.charset, 0x2C),
                extra: {
                    level: this.hi!.buffer[24 + i * 2]
                }
            });
        }
        return this;
    }
}
