import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 records of 5 bytes: score (2 bytes, hex digits, x100), name (3, A = 0x0A, but J = 0x27 and K =
// 0x28). Checked against the game's DO YOUR BEST ranking (MAME 0.289): NAK, AJI, MA-, KEN, JI.
@Extractor({
    name: 'duckhunt'
})
export default class Duckhunt extends AbstractExtractor {
    protected charset = {
        0x27: 'J',
        0x28: 'K',
        0x2E: '-',
        0x2F: '.',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 5, 2).toHexNumber() * 100,
                name: this.hi!.slice(i * 5 + 2, 3).toString(this.charset, 55)
            });
        }
        return this;
    }
}
