import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'mutantf'
})
export default class Mutantf extends AbstractExtractor {
    // Best Challengers: 5 records of 10 bytes, name (letters from 0x01), 1 byte, score (4 BCD
    // bytes), stage (counted from 0) and 1 byte
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const currentByte = i * 10;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(currentByte + 4, 4).toHexNumber(),
                name: this.hi!.slice(currentByte, 3).toString({}, 0x40),
                extra: {
                    stage: this.hi!.buffer[currentByte + 8] + 1
                }
            });
        }
        return this;
    }
}
