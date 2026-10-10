import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'dogyuun'
})
export default class Dogyuun extends AbstractExtractor {
    protected charset = {
        0x1B: '!',
    };

    // RANKING: the top score, 10 scores (4 BCD bytes), 10 stages (2 bytes, shown as "6-9"), then
    // 10 names of 3 tiles (a word each, letters from 0x01)
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(64 + i * 6, 6).byteSkip(false).toString(this.charset, 0x40),
                extra: {
                    stage: `${this.hi!.buffer[44 + i * 2]}-${this.hi!.buffer[45 + i * 2]}`
                }
            });
        }
        return this;
    }
}
