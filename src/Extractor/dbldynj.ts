import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 14 bytes: score (4 bytes, little-endian binary), 6 unknown bytes, name (3 and a 00).
// Checked against the game's ranking screen (MAME 0.289).
@Extractor({
    name: 'dbldynj'
})
export default class Dbldynj extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUInt32LE(i * 14),
                name: this.hi!.slice(i * 14 + 10, 3).toString()
            });
        }
        return this;
    }
}
