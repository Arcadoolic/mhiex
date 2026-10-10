import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {ScoreExtra} from "../interfaces";

@Extractor({
    name: 'truxton'
})
export default class Truxton extends AbstractExtractor {
    // Tiles shared by Toaplan's games of the time: digits from 0x00, letters from 0x0A
    protected charset = {
        0x00: '0', 0x01: '1', 0x02: '2', 0x03: '3', 0x04: '4',
        0x05: '5', 0x06: '6', 0x07: '7', 0x08: '8', 0x09: '9',
        0x24: '!',
        0x25: ',',
        0x26: '.',
        0x27: '+',
        0x28: '-',
        0x29: '&',
        0x2A: '?',
        0x2B: '←',
    };

    protected rows = 20;

    // Where the areas start: after the top score, the scores and the names
    protected get areas(): number {
        return 4 + this.rows * 16;
    }

    protected extra(row: number): ScoreExtra {
        return {area: this.hi!.buffer.readUInt16BE(this.areas + row * 2)};
    }

    // TOP PLAYERS: the top score, the scores (4 BCD bytes, tens dropped), the names (6 words
    // each, a tile in the low byte; the game shows the first 3), then the areas (a word)
    extract(): this {
        for (let i = 0; i < this.rows; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber() * 10,
                name: this.hi!.slice(4 + this.rows * 4 + i * 12, 6).byteSkip(false).toString(this.charset, 0x37),
                extra: this.extra(i)
            });
        }
        return this;
    }
}
