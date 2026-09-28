import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// Williams nvram tables (one nibble per byte), layout from hi2txt's definition: after tableOffset bytes,
// the all-time best (name 6, full name 40, or the other way round, then 1 checksum byte and a 7-digit
// score), the other all-time ranks (name 6, checksum, score 7), then the daily table in extras. Names are
// 3 characters from 2 nibbles each, plus nameOffset. Checked with npm run compare.
@Extractor({
    name: 'blaster',
    hi: false,
    nvram: 'nvram'
})
export default class Blaster extends AbstractExtractor {
    protected tableOffset = 360;
    protected fullNameFirst = false;
    protected allTime = 34;
    protected daily = 10;
    protected dailyId = 'masters';
    protected nameOffset = 0;
    protected charset: {[key: number]: string} = {0x3A: ' '};

    protected scoreFactor = 10;

    protected record(nameAt: number, scoreAt: number, rank: number): Score {
        return {
            rank,
            score: parseInt(this.nvram!.slice(scoreAt, 7).hexDigits('odd')) * this.scoreFactor,
            name: this.nvram!.slice(nameAt, 6).nibbleSkip(false).toString(this.charset, this.nameOffset).trim()
        };
    }

    extract(): this {
        let o = this.tableOffset;
        const first = this.record(this.fullNameFirst ? o + 40 : o, o + 47, 1);
        this.output.default.push(first);
        o += 54;
        for (let i = 1; i < this.allTime; i++, o += 14) {
            this.output.default.push(this.record(o, o + 7, i + 1));
        }
        this.output.extras = {[this.dailyId]: []};
        for (let i = 0; i < this.daily; i++, o += 14) {
            this.output.extras[this.dailyId].push(this.record(o, o + 7, i + 1));
        }
        return this;
    }
}
