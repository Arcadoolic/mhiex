import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'gng'
})
export default class Gng extends AbstractExtractor {
    protected charset = {
        0x1D: '.'
    };

    extract(): this {
        const pointers = this.hi!.slice(0, 20).byteSkip(false).buffer;

        for (let rank = 0; rank < 10; rank++) {
            const currentByte = 20 + ((pointers[rank] - 44) / 7) * 7;
            this.scores.default.push({
                rank: rank + 1,
                score: parseInt(this.hi!.buffer.readIntBE(currentByte, 4).toString(16)),
                name: this.hi!.slice(currentByte + 4, 3).toString(this.charset)
            });
        }
        return this;
    }
}
