import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 5: 5 records of 6 bytes: score (2 bytes, little-endian binary), 00, name (3 ASCII characters).
// Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'rjammer'
})
export default class Rjammer extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUInt16LE(i * 6),
                name: this.hi!.slice(i * 6 + 3, 3).toString().trim()
            });
        }
        return this;
    }
}
