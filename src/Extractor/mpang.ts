import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// RANKING, three tables of 20 rows of 8 bytes: TOUR MODE (default), PANIC MODE (extras.panic), EXPERT
// MODE (extras.expert). A row: the score in 4 BCD bytes, 3 letters in ASCII, then the stage (the level in
// panic mode; in expert mode the default top 2 have bit 7 set, drawn as a mark after the stage).
// Checked on the game's screen (MAME 0.289) with a modified file (00 98 76 50 ZAQ 1E shows
// 0987650 ZAQ 30; XYZ 07 on panic, QQQ 2A shows 42 on expert).
@Extractor({
    name: 'mpang'
})
export default class Mpang extends AbstractExtractor {
    private table(offset: number, column: string): Score[] {
        const rows: Score[] = [];
        for (let i = 0; i < 20; i++) {
            const row = offset + i * 8;
            rows.push({
                rank: i + 1,
                score: this.hi!.slice(row, 4).toHexNumber(),
                name: this.hi!.slice(row + 4, 3).toString(),
                extra: {
                    [column]: this.hi!.buffer[row + 7] & 0x7F
                }
            });
        }
        return rows;
    }

    extract(): this {
        this.output.default = this.table(0, 'stage');
        this.output.extras = {panic: this.table(160, 'level'), expert: this.table(320, 'stage')};
        return this;
    }
}
