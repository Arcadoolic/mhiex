import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// SCORE RANKING then VS RANKING, 5 records of 16 bytes each: rank, suffix ("st", "nd"...), 00, score
// (4 bytes, hex digits), name (3 ASCII characters), character, 4 bytes. Score ranking as default, VS
// ranking in extras. Checked against the game's screens (MAME 0.289).
@Extractor({
    name: 'sfa'
})
export default class Sfa extends AbstractExtractor {
    protected table(offset: number): Score[] {
        const scores: Score[] = [];
        for (let i = 0; i < 5; i++) {
            const o = offset + i * 16;
            scores.push({
                rank: i + 1,
                score: this.hi!.slice(o + 4, 4).toHexNumber(),
                name: this.hi!.slice(o + 8, 3).toString().trim()
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(0);
        this.output.extras = {vs: this.table(80)};
        return this;
    }
}
