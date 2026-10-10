import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

@Extractor({
    name: 'batsugun'
})
export default class Batsugun extends AbstractExtractor {
    // Tiles (low byte of a word): digits from 0x18, letters from 0x29
    protected charset = {
        0x0B: '#',
        0x14: '.',
        0x15: '-',
        0x16: ',',
        0x17: '/',
        0x18: '0', 0x19: '1', 0x1A: '2', 0x1B: '3', 0x1C: '4',
        0x1D: '5', 0x1E: '6', 0x1F: '7', 0x20: '8', 0x21: '9',
    };

    // TOP PLAYERS: the top score, 8 scores (4 BCD bytes), 8 names of 3 tiles (a word each), then
    // 8 stages (a word; 0 for a default row, shown as "-")
    extract(): this {
        for (let i = 0; i < 8; i++) {
            const row: Score = {
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(36 + i * 6, 6).byteSkip(false).toString(this.charset, 0x18)
            };
            const stage = this.hi!.buffer.readUInt16BE(84 + i * 2);
            if (stage) {
                row.extra = {stage};
            }
            this.output.default.push(row);
        }
        return this;
    }
}
