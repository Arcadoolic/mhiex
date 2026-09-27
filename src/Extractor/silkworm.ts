import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// Layout from hi2txt's definition: 10 records of 10 bytes, 5 HELI then 5 JEEP: rank, score (3 bytes,
// little-endian hex digits, x100), name (3 ASCII characters), stage, time (minutes, seconds). HELI as
// default, JEEP in extras. Checked with npm run compare.
@Extractor({
    name: 'silkworm'
})
export default class Silkworm extends AbstractExtractor {
    protected table(first: number): Score[] {
        const scores: Score[] = [];
        for (let i = 0; i < 5; i++) {
            const o = (first + i) * 10;
            const b = this.hi!.buffer;
            scores.push({
                rank: i + 1,
                score: this.hi!.slice(o + 1, 3).reverse().toHexNumber() * 100,
                name: this.hi!.slice(o + 4, 3).toString({0x5B: '.'}).trim(),
                extra: {stage: b[o + 7], time: `${b[o + 8].toString(16)}:${b[o + 9].toString(16).padStart(2, '0')}`}
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(0);
        this.output.extras = {jeep: this.table(5)};
        return this;
    }
}
