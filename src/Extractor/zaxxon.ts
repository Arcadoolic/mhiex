import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'zaxxon'
})
export default class Zaxxon extends AbstractExtractor {
    protected charset = {
        0x10: ' ',
        0x2B: '.',
    };

    // 6 records of 21 bytes: 2 bytes, rank, 1 byte, the score as shown (6 digits, one per byte),
    // the initials (4 tiles, letters from 0x11, blank until entered), 0x3F, the score again (BCD)
    // and 2 bytes. Then the top score.
    extract(): this {
        for (let i = 0; i < 6; i++) {
            const currentByte = i * 21;
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(currentByte + 4, 6).hexDigits('odd')),
                name: this.hi!.slice(currentByte + 10, 4).toString(this.charset, 0x30).trimEnd()
            });
        }
        return this;
    }
}
