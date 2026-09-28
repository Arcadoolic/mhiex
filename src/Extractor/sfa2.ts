import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// SCORE RANKING (from byte 0) then VS RANKING (from byte 96), 5 records of 16 bytes each: score (4
// bytes, hex digits), name (3 letters, A = 0), 00, character, 3 bytes, wins (VS ranking). Score
// ranking as default, VS ranking in extras (points, wins in extra). Checked against the game's screens
// (MAME 0.289).
@Extractor({
    name: 'sfa2'
})
export default class Sfa2 extends AbstractExtractor {
    protected table(offset: number, vs: boolean): Score[] {
        const scores: Score[] = [];
        for (let i = 0; i < 5; i++) {
            const o = offset + i * 16;
            scores.push({
                rank: i + 1,
                score: this.hi!.slice(o, 4).toHexNumber(),
                name: this.hi!.slice(o + 4, 3).toString({}, 0x41).trim(),
                ...(vs ? {extra: {wins: this.hi!.buffer[o + 12]}} : {})
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(0, false);
        this.output.extras = {vs: this.table(96, true)};
        return this;
    }
}
