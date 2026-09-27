import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'baddudes'
})
export default class Baddudes extends AbstractExtractor {
    extract(): this {
        // 20 records of 8 bytes: name (3), score (4, hex digits), stage reached (1); then the top score
        for (let i = 0; i < 20; i++) {
            const currentByte = i * 8;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(currentByte + 3, 4).toHexNumber(),
                name: this.hi!.slice(currentByte, 3).toString(),
                extra: {
                    stage: this.hi!.buffer[currentByte + 7]
                }
            });
        }
        return this;
    }
}
