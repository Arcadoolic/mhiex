import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// SCORING LEADERS: 10 records of 16 bytes: name (8 ASCII characters, '-' shows '.'), score to par
// (2 bytes, signed little-endian: -11, 0 for EVEN), place (hex digits). The MAME 0.289 hiscore.dat
// entry cuts the 10th record after its place. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'majtitle'
})
export default class Majtitle extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readInt16LE(i * 16 + 8),
                name: this.hi!.slice(i * 16, 8).toString({0x2D: '.', 0x00: ' '}).trim(),
                extra: {place: this.hi!.slice(i * 16 + 10, 1).toHexNumber()}
            });
        }
        return this;
    }
}
