import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 19 bytes: score (4 bytes, little-endian binary), 4 unknown bytes, name (5 characters,
// the default ones are "* * *"), 6 unknown bytes. Checked against the game's ranking screen (MAME 0.289).
@Extractor({
    name: 'deadang'
})
export default class Deadang extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUInt32LE(i * 19),
                name: this.hi!.slice(i * 19 + 8, 5).toString()
            });
        }
        return this;
    }
}
