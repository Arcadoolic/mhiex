import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The game keeps its table in the Neo-Geo backup RAM (16-bit words, byte-swapped in the file) at
// 0x4c6: per entry, the score as 4 bytes of BCD, the name as 4 characters, 2 bytes of 0xff, then the
// stage (2 bytes, 0-based). It reloads it at every start, which sets 0x105ddd to 0x45: hiscore.dat's
// check wants 0x41 there, so the hiscore plugin's .hi stops being written after the first score
// beaten. Layout from hi2txt's saveram definition, checked against the game's Hall of Fame (MAME 0.289).
@Extractor({
    name: 'nitd',
    hi: false,
    nvram: 'saveram'
})
export default class Nitd extends AbstractExtractor {
    extract(): this {
        this.nvram = this.nvram!.byteSwap(2);
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.nvram.slice(0x4c6 + i * 12, 4).toHexNumber(),
                name: this.nvram.slice(0x4ca + i * 12, 4).toString()
            });
        }
        return this;
    }
}
