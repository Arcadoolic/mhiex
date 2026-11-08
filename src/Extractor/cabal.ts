import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 10 PLAYERS: rows of 10 bytes, 3 ASCII letters and 00, the score in 3 BCD bytes, a byte, then
// the area reached as an index (0 is 1-1, 4 areas per stage) and a byte. Checked on the game's screen
// (MAME 0.289) with a modified file (ZAQ 98 76 54, area 05 shows ZAQ 00987654 2-2).
@Extractor({
    name: 'cabal'
})
export default class Cabal extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            const row = i * 10;
            const area = this.hi!.buffer[row + 8];
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row + 4, 3).toHexNumber(),
                name: this.hi!.slice(row, 3).toString(),
                extra: {
                    area: `${Math.floor(area / 4) + 1}-${area % 4 + 1}`
                }
            });
        }
        return this;
    }
}
