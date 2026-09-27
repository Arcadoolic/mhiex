import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 scores (3 bytes, hex digits), then 10 names (3 characters, A = 0x11); then the top score. The
// game's ranking screen shows the first 5 (checked in MAME 0.289).
@Extractor({
    name: 'rushatck'
})
export default class Rushatck extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 3, 3).toHexNumber(),
                name: this.hi!.slice(30 + i * 3, 3).toString({}, 0x30).trim()
            });
        }
        return this;
    }
}
