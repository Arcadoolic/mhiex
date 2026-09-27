import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// Layout from hi2txt's definition: 3 LIVES then 7 LIVES tables, 8 records of 16 bytes each: name (3
// characters, A = 0x0A), 1 byte, score (12 bytes, one digit each, 0x24 blank). 3 lives as default, 7
// lives in extras. Checked with npm run compare.
@Extractor({
    name: 'reactor'
})
export default class Reactor extends AbstractExtractor {
    protected table(offset: number): Score[] {
        const scores: Score[] = [];
        for (let i = 0; i < 8; i++) {
            const o = offset + i * 16;
            const digits = [...this.hi!.slice(o + 4, 12).buffer].filter(d => d !== 0x24).join('');
            scores.push({
                rank: i + 1,
                score: parseInt(digits || '0'),
                name: this.hi!.slice(o, 3).toString({0x24: ' '}, 55).trim()
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(0);
        this.output.extras = {lives7: this.table(128)};
        return this;
    }
}
