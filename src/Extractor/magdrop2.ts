import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// Magical Drop II (Neo-Geo): three top 5 in the saveram, its 16-bit words byte-swapped, from 0x528,
// 0x32 bytes each: 5 scores (4 bytes BCD), 5 names (3 characters and a 0), then a word per row
// (not shown). Characters are 0x40 + 4 * letter (A to Z), 0x34 the dot of the default "D.E".
// Which table a game goes into depends on its mode: the third one ranks PUZZLE (checked with a game
// on hard, 2026-11-26; medium most likely shares it), the first one VS CPU. The attract mode shows
// the first one in pink, the third in yellow. What fills the second is not known: kept as an extra.
@Extractor({
    name: 'magdrop2',
    hi: false,
    nvram: 'saveram',
    tables: {default: 'Puzzle', vs_cpu: 'VS CPU'}
})
export default class Magdrop2 extends AbstractExtractor {
    protected charset: {[key: number]: string} = {0x34: '.'};

    extract(): this {
        const ram = this.nvram!.slice(0x528, 3 * 0x32).byteSwap(2);
        const table = (index: number): Score[] => {
            const scores: Score[] = [];
            for (let i = 0; i < 5; i++) {
                const o = index * 0x32;
                scores.push({
                    rank: i + 1,
                    score: ram.slice(o + i * 4, 4).toHexNumber(),
                    name: ram.slice(o + 20 + i * 4, 3).toString(this.charset, 0x31, 4).trim()
                });
            }
            return scores;
        };
        this.output.default = table(2);
        this.output.extras = {vs_cpu: table(0), table2: table(1)};
        return this;
    }
}
