import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// Layout from hi2txt's definition: 1 PLAYER then 2 PLAYERS tables, 10 records of 12 bytes each: score
// (4 bytes, little-endian binary, shown with its last digit as 0), level, loop (2 bytes each), name (4
// characters). Solo table as default, dual in extras. Checked with npm run compare.
@Extractor({
    name: 'raiden2'
})
export default class Raiden2 extends AbstractExtractor {
    protected charset = {0x00: '', 0x5B: '!', 0x5C: '?', 0x5D: '-', 0x5E: '.', 0x5F: ' '};

    protected table(offset: number): Score[] {
        const scores: Score[] = [];
        for (let i = 0; i < 10; i++) {
            const o = offset + i * 12;
            if (o + 12 > this.hi!.buffer.length + 1) {
                break;
            }
            const b = this.hi!.buffer;
            scores.push({
                rank: i + 1,
                score: Math.trunc(b.readUInt32LE(o) / 10) * 10,
                name: this.hi!.slice(o + 8, 4).toString(this.charset).trim(),
                extra: {stage: `${b.readUInt16LE(o + 6) + 1}-${b.readUInt16LE(o + 4)}`}
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(0);
        this.output.extras = {dual: this.table(120)};
        return this;
    }
}
