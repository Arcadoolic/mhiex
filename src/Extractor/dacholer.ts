import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 scores of 4 bytes: two little-endian 16-bit words, score = high * 10000 + low; then 5 names of 3
// characters ('>' is '.'); then the top score (a copy). Checked in MAME 0.289 with a modified file
// loaded by the hiscore plugin: 88 11 12 13 shows 48824488.
@Extractor({
    name: 'dacholer'
})
export default class Dacholer extends AbstractExtractor {
    protected charset = {
        0x3E: '.',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const buffer = this.hi!.buffer;
            this.output.default.push({
                rank: i + 1,
                score: buffer.readUInt16LE(i * 4 + 2) * 10000 + buffer.readUInt16LE(i * 4),
                name: this.hi!.slice(20 + i * 3, 3).toString(this.charset)
            });
        }
        return this;
    }
}
