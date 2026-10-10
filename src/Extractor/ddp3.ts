import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'ddp3'
})
export default class Ddp3 extends AbstractExtractor {
    // 5 scores (4 BCD bytes, without their last digit), 5 names of 3 letters (4 bytes each, 4
    // times the letter's rank), ..., 5 stages (a word, counted from 0) at 0x5A, 5 max hits (a
    // BCD word) at 0x78, then the last digit of each score (a word)
    extract(): this {
        for (let i = 0; i < 5; i++) {
            let name = '';
            for (let j = 0; j < 3; j++) {
                name += String.fromCharCode(0x41 + this.hi!.buffer.readUInt32BE(20 + i * 12 + j * 4) / 4);
            }
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber() * 10 + this.hi!.buffer.readUInt16BE(0x82 + i * 2),
                name,
                extra: {
                    stage: this.hi!.buffer.readUInt16BE(0x5A + i * 2) + 1,
                    maxHit: this.hi!.slice(0x78 + i * 2, 2).toHexNumber()
                }
            });
        }
        return this;
    }
}
