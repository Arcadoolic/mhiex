import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 scores (4 bytes, hex digits), 20 bytes, then 5 records of 4 bytes: name (3 letters, A = 0), wins.
// Checked against the game's ranking screen (MAME 0.289).
@Extractor({
    name: 'xmcota'
})
export default class Xmcota extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber(),
                name: this.hi!.slice(40 + i * 4, 3).toString({}, 0x41).trim(),
                extra: {wins: this.hi!.buffer[43 + i * 4]}
            });
        }
        return this;
    }
}
