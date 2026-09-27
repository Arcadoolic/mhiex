import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// A marker byte, then the score ranking and the VS ranking, 5 records of 10 bytes each: value (4
// bytes, hex digits; the wins in the first 2 bytes), team (2 characters around the name), name (3
// letters, A = 0). Score ranking as default, VS ranking in extras. Checked against the game's
// ranking screens (MAME 0.289).
@Extractor({
    name: 'mvsc'
})
export default class Mvsc extends AbstractExtractor {
    protected table(offset: number, value: (o: number) => number, scoreSuffix?: string): Score[] {
        const scores: Score[] = [];
        for (let i = 0; i < 5; i++) {
            const o = offset + i * 10;
            scores.push({
                rank: i + 1,
                score: value(o),
                name: this.hi!.slice(o + 6, 3).toString({}, 0x41),
                ...(scoreSuffix ? {scoreSuffix} : {})
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(1, o => this.hi!.slice(o, 4).toHexNumber());
        this.output.extras = {vs: this.table(51, o => this.hi!.slice(o, 2).toHexNumber(), 'wins')};
        return this;
    }
}
