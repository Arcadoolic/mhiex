import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 records of 14 bytes: score (3 bytes, hex digits), name (8 tile codes), round - 1 (1 byte, then 2 unknown), then
// the top score. Scores and rounds checked against the game's BEST 5 screen (MAME 0.289). The
// default names are dotted tiles (01-05): the letter coding, taken from cclimber (A = 0x0A), is not
// checked on screen.
@Extractor({
    name: 'cclimbr2'
})
export default class Cclimbr2 extends AbstractExtractor {
    protected charset = {
        0x01: '.', 0x02: '.', 0x03: '.', 0x04: '.', 0x05: '.',
        0x2C: ' ',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const currentByte = i * 14;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(currentByte, 3).toHexNumber(),
                name: this.hi!.slice(currentByte + 3, 8).toString(this.charset, 55),
                extra: {
                    round: this.hi!.buffer[currentByte + 11] + 1
                }
            });
        }
        return this;
    }
}
