import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// RANKING by belt, three tables of 8 rows of 8 bytes: black belt (default), brown (extras.brown), white
// (extras.white). A row: 3 letters (0x5D is A, 0x86 the dot of "Y.H"), the number of opponents beaten
// (BEATED, shown as hex digits), then the score in hundreds as a 32-bit number. Checked on the game's
// screen (MAME 0.289) with a modified file (ZAQ 0A 00 01 23 45 shows ZAQ 0A 7456500; XYZ 05 00 00 30 39
// on the brown belt shows 1234500).
@Extractor({
    name: 'karatour'
})
export default class Karatour extends AbstractExtractor {
    protected charset = {
        0x86: '.',
    };

    private table(offset: number): Score[] {
        const rows: Score[] = [];
        for (let i = 0; i < 8; i++) {
            const row = offset + i * 8;
            rows.push({
                rank: i + 1,
                score: this.hi!.slice(row + 4, 4).buffer.readUInt32BE(0) * 100,
                name: this.hi!.slice(row, 3).toString(this.charset, -0x1C),
                extra: {
                    beaten: this.hi!.slice(row + 3, 1).readIntBE()
                }
            });
        }
        return rows;
    }

    extract(): this {
        this.output.default = this.table(0);
        this.output.extras = {brown: this.table(64), white: this.table(128)};
        return this;
    }
}
