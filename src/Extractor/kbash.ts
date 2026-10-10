import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'kbash'
})
export default class Kbash extends AbstractExtractor {
    // 5 scores (4 BCD bytes), 5 areas (a BCD word), then 5 names of 3 tiles (a word each,
    // letters from 0x22)
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber(),
                name: this.hi!.slice(30 + i * 6, 6).byteSkip(false).toString({}, 0x1F),
                extra: {
                    area: this.hi!.slice(20 + i * 2, 2).toHexNumber()
                }
            });
        }
        return this;
    }
}
