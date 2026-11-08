import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// BEST PILOT, SOLO FIGHTER (default) then DUAL FIGHTER (extras.dual, from offset 0x80): 10 rows of 12
// bytes, 3 letters in ASCII ("---" when empty) and 00, the score as hundreds on 3 bytes plus its tens
// digit on the 4th, then the stage and the plane. Checked on the game's screen (MAME 0.289) with modified
// files (00 01 23 07 shows 0029170, ZAQ; 00 00 40 05 XYZ shows 0006450 on the dual table).
@Extractor({
    name: 'dblewing'
})
export default class Dblewing extends AbstractExtractor {
    private table(offset: number): Score[] {
        const rows: Score[] = [];
        for (let i = 0; i < 10; i++) {
            const row = offset + i * 12;
            rows.push({
                rank: i + 1,
                score: this.hi!.slice(row + 4, 3).buffer.readUIntBE(0, 3) * 100 + this.hi!.slice(row + 7, 1).readIntBE() * 10,
                name: this.hi!.slice(row, 3).toString()
            });
        }
        return rows;
    }

    extract(): this {
        this.output.default = this.table(0);
        this.output.extras = {dual: this.table(0x80)};
        return this;
    }
}
