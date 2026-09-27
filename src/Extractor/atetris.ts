import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The game keeps 16 entries: scores as 6 ASCII digits, then 16 names of 3 characters. The MAME 0.289
// hiscore.dat entry (99d, 0x6c bytes) starts 36 bytes into the table: the scores of ranks 1-6 are
// not in the file (an older entry, 979 for 0x90 bytes, had them). Ranks 7-16 only, checked against
// the game's HIGH SCORES screen (MAME 0.289).
@Extractor({
    name: 'atetris'
})
export default class Atetris extends AbstractExtractor {
    extract(): this {
        for (let rank = 7; rank <= 16; rank++) {
            this.output.default.push({
                rank,
                score: parseInt(this.hi!.slice((rank - 7) * 6, 6).toString()),
                name: this.hi!.slice(60 + (rank - 1) * 3, 3).toString()
            });
        }
        return this;
    }
}
