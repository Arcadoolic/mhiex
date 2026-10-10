import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'esprade'
})
export default class Esprade extends AbstractExtractor {
    // SCORE RANKING: 5 scores (4 BCD bytes, without their last digit), 5 names of 3 tiles (a
    // word each, letters from 0x99), 5 stages (twice the stage in the low byte of a word), the
    // last digit of each score (a word), 5 words, then the top score
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber() * 10 + this.hi!.buffer.readUInt16BE(0x3C + i * 2),
                name: this.hi!.slice(20 + i * 6, 6).byteSkip(false).toString({}, -0x58),
                extra: {
                    stage: this.hi!.buffer[0x33 + i * 2] / 2
                }
            });
        }
        return this;
    }
}
