import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'twinhawk'
})
export default class Twinhawk extends AbstractExtractor {
    // The top score, 5 scores (4 BCD bytes), 5 areas (a word, the number in its low byte), then
    // 5 names of 3 tiles (a word each, the letter in its low byte, from 0x9C)
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(34 + i * 6, 6).byteSkip(false).toString({}, -0x5B),
                extra: {
                    area: this.hi!.buffer[25 + i * 2]
                }
            });
        }
        return this;
    }
}
