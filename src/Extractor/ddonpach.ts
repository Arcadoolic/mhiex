import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'ddonpach'
})
export default class Ddonpach extends AbstractExtractor {
    // SCORE RANKING: 5 scores (4 BCD bytes, without their last digit), 5 names of 3 tiles (a
    // word each: letters every 4 from 0x184, 0x138 for a dot), ..., 5 max hits (a BCD word) at
    // 0x50, the last digit of each score (a word) at 0x5A, then the top score
    extract(): this {
        for (let i = 0; i < 5; i++) {
            let name = '';
            for (let j = 0; j < 3; j++) {
                const tile = this.hi!.buffer.readUInt16BE(20 + i * 6 + j * 2);
                name += tile === 0x138 ? '.' : String.fromCharCode(0x41 + (tile - 0x184) / 4);
            }
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber() * 10 + this.hi!.buffer.readUInt16BE(0x5A + i * 2),
                name,
                extra: {
                    maxHit: this.hi!.slice(0x50 + i * 2, 2).toHexNumber()
                }
            });
        }
        return this;
    }
}
