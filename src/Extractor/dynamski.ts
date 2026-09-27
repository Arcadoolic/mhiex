import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 13 records of 7 bytes: 00, score (3 bytes, hex digits, x100), name (3); the first 10 are the SCORE
// RANKING, the last 3 the MEDALIST table; then the top score. Characters: 0-9 are the digits, then
// ' . : (c) ( ) and space, A = 0x11. Checked in MAME 0.289 against both screens, and with names set
// to codes 0x00-0x24 in a file loaded by the hiscore plugin.
@Extractor({
    name: 'dynamski'
})
export default class Dynamski extends AbstractExtractor {
    protected charset = {
        0x0A: '\'',
        0x0B: '.',
        0x0C: ':',
        0x0D: '&copyright;',
        0x0E: '(',
        0x0F: ')',
        0x10: ' ',
    };

    protected record(i: number, rank: number) {
        return {
            rank,
            score: this.hi!.slice(i * 7 + 1, 3).toHexNumber() * 100,
            name: this.hi!.slice(i * 7 + 4, 3).toString(this.charset, 48)
        };
    }

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push(this.record(i, i + 1));
        }
        this.output.extras = {medalist: [0, 1, 2].map(k => this.record(10 + k, k + 1))};
        return this;
    }
}
