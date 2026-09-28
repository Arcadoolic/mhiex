import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// HI-SCORE RANK: SOLO PLAY then DUAL PLAY, 7 records of 11 bytes each: name (3 ASCII characters),
// 00, score (4 bytes, little-endian binary), level, plane, 00 (the MAME 0.289 hiscore.dat entry cuts
// the last 2 bytes). Checked against the game's screens (MAME 0.289, on a second boot: the first one
// updates the nvram).
@Extractor({
    name: 'rfjet'
})
export default class Rfjet extends AbstractExtractor {
    protected table(offset: number): Score[] {
        const scores: Score[] = [];
        for (let i = 0; i < 7; i++) {
            const o = offset + i * 11;
            scores.push({
                rank: i + 1,
                score: this.hi!.buffer.readUInt32LE(o + 4),
                name: this.hi!.slice(o, 3).toString().trim(),
                extra: {level: this.hi!.buffer[o + 8]}
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(0);
        this.output.extras = {dual: this.table(77)};
        return this;
    }
}
