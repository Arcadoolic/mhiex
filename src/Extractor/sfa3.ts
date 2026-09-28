import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// 6 tables of 29 records of 16 bytes: X-ISM, A-ISM, V-ISM SCORE RANKING, then X-ISM, A-ISM, V-ISM VS
// RANKING. Record: score (4 bytes, hex digits), name (3 letters, A = 0), '-', character, 2 bytes, wins,
// 3 bytes, table index. The game shows 25 ranks. X-ISM score ranking as default, the others in extras
// (VS rankings in wins). Tables identified with names set per table in a file loaded by the hiscore
// plugin (MAME 0.289).
@Extractor({
    name: 'sfa3'
})
export default class Sfa3 extends AbstractExtractor {
    protected table(index: number, vs: boolean): Score[] {
        const scores: Score[] = [];
        for (let i = 0; i < 25; i++) {
            const o = (index * 29 + i) * 16;
            scores.push({
                rank: i + 1,
                score: vs ? this.hi!.buffer[o + 11] : this.hi!.slice(o, 4).toHexNumber(),
                name: this.hi!.slice(o + 4, 3).toString({}, 0x41).trim(),
                ...(vs ? {scoreSuffix: 'wins'} : {})
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(0, false);
        this.output.extras = {
            aism: this.table(1, false),
            vism: this.table(2, false),
            xismvs: this.table(3, true),
            aismvs: this.table(4, true),
            vismvs: this.table(5, true),
        };
        return this;
    }
}
