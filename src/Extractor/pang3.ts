import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// Two tables, NORMAL MODE (default) then PANIC MODE (extras.panic). Each: 5 pointers, one per rank, to
// its row (68000 addresses, FF9726 is the file's first byte), then 5 rows of 10 bytes, the score in 4 BCD
// bytes, 3 letters in ASCII, the character (index of the portrait) and the stage or level reached minus 1
// on 2 bytes. Checked on the game's screen (MAME 0.289) with a modified file: swapping the first two
// pointers shows PL2 first and the modified row (00 98 76 50 ZAQ, 00 09) second as 987650 ZAQ 10; PANIC
// MODE shows 123450 XYZ L20 for 00 12 34 50 and 00 13.
@Extractor({
    name: 'pang3'
})
export default class Pang3 extends AbstractExtractor {
    private static readonly BASE = 0xFF9726;

    private table(offset: number): Score[] {
        const rows: Score[] = [];
        for (let i = 0; i < 5; i++) {
            const row = (this.hi!.slice(offset + i * 4, 4).buffer.readUInt32BE(0) & 0xFFFFFF) - Pang3.BASE;
            rows.push({
                rank: i + 1,
                score: this.hi!.slice(row, 4).toHexNumber(),
                name: this.hi!.slice(row + 4, 3).toString(),
                extra: {
                    character: this.hi!.slice(row + 7, 1).readIntBE(),
                    stage: this.hi!.slice(row + 8, 2).buffer.readUInt16BE(0) + 1
                }
            });
        }
        return rows;
    }

    extract(): this {
        this.output.default = this.table(0);
        this.output.extras = {panic: this.table(70)};
        return this;
    }
}
