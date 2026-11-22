import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// Magical Drop III (Neo-Geo): three top 5 in the saveram, its 16-bit words byte-swapped, from 0x528,
// one after the other: Challenge Mode (VS CPU), Magical Journey (adventure), Survival Mode (puzzle),
// as the attract mode shows them. A record is 12 bytes: the score (4 bytes BCD), the name (3
// characters and a 0), then per mode: Challenge the time (BCD minutes, seconds), the reactions (BCD)
// and the character; Journey the spaces (BCD, 2 bytes) and the character; Survival the reactions
// (BCD). Characters are 0x40 + 4 * letter (A to Z), 0xA8 the dot of the default "D.E", 0xAC "END".
// Checked against the attract mode's rankings with a crafted saveram (demo-hiscores).
@Extractor({
    name: 'magdrop3',
    hi: false,
    nvram: 'saveram'
})
export default class Magdrop3 extends AbstractExtractor {
    protected charset: {[key: number]: string} = {0xA8: '.', 0xAC: ''};

    extract(withExtra?: boolean): this {
        const ram = this.nvram!.slice(0x528, 3 * 5 * 12).byteSwap(2);
        const table = (index: number, extra: (o: number) => Score['extra']): Score[] => {
            const scores: Score[] = [];
            for (let i = 0; i < 5; i++) {
                const o = (index * 5 + i) * 12;
                const score: Score = {
                    rank: i + 1,
                    score: ram.slice(o, 4).toHexNumber(),
                    name: ram.slice(o + 4, 3).toString(this.charset, 0x31, 4).trim()
                };
                if (withExtra) {
                    score.extra = extra(o);
                }
                scores.push(score);
            }
            return scores;
        };
        this.output.default = table(0, o => ({
            reactions: ram.slice(o + 10, 1).toHexNumber(),
            time: ram.slice(o + 8, 1).toHexNumber().toString().padStart(2, '0') + ':'
                + ram.slice(o + 9, 1).toHexNumber().toString().padStart(2, '0'),
            character: ram.slice(o + 11, 1).readIntBE()
        }));
        this.output.extras = {
            journey: table(1, o => ({
                spaces: ram.slice(o + 8, 2).toHexNumber(),
                character: ram.slice(o + 11, 1).readIntBE()
            })),
            survival: table(2, o => ({
                reactions: ram.slice(o + 10, 1).toHexNumber()
            }))
        };
        return this;
    }
}
