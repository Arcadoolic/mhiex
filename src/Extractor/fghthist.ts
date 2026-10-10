import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'fghthist'
})
export default class Fghthist extends AbstractExtractor {
    // RANKING: 5 records of 8 bytes, score (4 bytes, binary, little-endian), name (letters from
    // 0x01) and 1 byte
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUInt32LE(i * 8),
                name: this.hi!.slice(i * 8 + 4, 3).toString({}, 0x40)
            });
        }
        return this;
    }
}
