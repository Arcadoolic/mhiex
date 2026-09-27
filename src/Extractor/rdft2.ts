import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// TODAY'S HI-SCORE: from byte 260, SOLO PLAY then DUAL PLAY, 7 records of 12 bytes each: 00, stage
// (area, round), plane, score (4 bytes, little-endian binary), name (3 ASCII characters), 00. The 16
// records before them are not shown in attract mode (left out). Checked against the game's screens
// (MAME 0.289, on a second boot: the first one updates the nvram).
@Extractor({
    name: 'rdft2'
})
export default class Rdft2 extends AbstractExtractor {
    protected table(offset: number): Score[] {
        const scores: Score[] = [];
        for (let i = 0; i < 7; i++) {
            const o = offset + i * 12;
            scores.push({
                rank: i + 1,
                score: this.hi!.buffer.readUInt32LE(o + 4),
                name: this.hi!.slice(o + 8, 3).toString().trim(),
                extra: {stage: `${this.hi!.buffer[o + 1]}-${this.hi!.buffer[o + 2]}`}
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(260);
        this.output.extras = {dual: this.table(344)};
        return this;
    }
}
