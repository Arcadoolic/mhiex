import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 5: 5 records of 6 bytes: round, goals scored, goals conceded, name (3 letters, A = 0). The
// round reached is the score, the match score in extra. Default names are AAA with round 0. Checked
// with a modified file loaded by the hiscore plugin (MAME 0.289).
@Extractor({
    name: 'twcup90'
})
export default class Twcup90 extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const o = i * 6;
            const b = this.hi!.buffer;
            this.output.default.push({
                rank: i + 1,
                score: b[o],
                name: this.hi!.slice(o + 3, 3).toString({}, 0x41).trim(),
                extra: {goals: `${b[o + 1]}-${b[o + 2]}`}
            });
        }
        return this;
    }
}
