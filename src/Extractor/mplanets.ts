import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// Layout from hi2txt's definition: from nvram byte 1344, tables of 20 records of 14 bytes stored from
// the last rank, 14 bytes apart: 2 bytes, score (7 bytes, low nibbles, F9 blank), 1 byte, name (3
// characters), 1 byte. The 2nd table (GALACTIC HALL OF FAME) as default, the 1st (daily) in extras.
// Checked with npm run compare.
@Extractor({
    name: 'mplanets',
    hi: false,
    nvram: 'nvram'
})
export default class Mplanets extends AbstractExtractor {
    protected charset = {0x0A: 'A', 0x0B: 'B', 0x0C: 'C', 0x0D: 'D', 0x0E: 'E', 0x0F: 'F', 0x1A: 'G', 0x1B: 'H', 0x1C: 'I', 0x1D: 'J', 0x1E: 'K', 0x1F: 'L', 0x2A: 'M', 0x2B: 'N', 0x2C: 'O', 0x2D: 'P', 0x2E: 'Q', 0x2F: 'R', 0x3A: 'S', 0x3B: 'T', 0x3C: 'U', 0x3D: 'V', 0x3E: 'W', 0x3F: 'X', 0x57: 'Y', 0x5F: 'Z', 0xF9: ' '};

    protected table(index: number): Score[] {
        const scores: Score[] = [];
        const start = 1344 + index * (20 * 14 + 14);
        for (let rank = 1; rank <= 20; rank++) {
            const o = start + (20 - rank) * 14;
            const digits = [...this.nvram!.slice(o + 2, 7).buffer].filter(d => d !== 0xF9).map(d => (d & 0x0F).toString(16)).join('');
            scores.push({
                rank,
                score: parseInt(digits || '0'),
                name: this.nvram!.slice(o + 10, 3).toString(this.charset).trim()
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(1);
        this.output.extras = {daily: this.table(0)};
        return this;
    }
}
