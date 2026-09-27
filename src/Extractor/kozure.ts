import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score (4 bytes), then 5 records of 8 bytes: score (4 bytes, hex digits), initials (3 ASCII
// characters, shown with dots: A.B.C), 00. Checked against the game's BEST 5 screen (MAME 0.289).
@Extractor({
    name: 'kozure'
})
export default class Kozure extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 8, 4).toHexNumber(),
                name: this.hi!.slice(8 + i * 8, 3).toString({0x00: ' '}).split('').join('.').trim()
            });
        }
        return this;
    }
}
