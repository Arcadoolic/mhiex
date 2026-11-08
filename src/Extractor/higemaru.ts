import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HIGEMARU BEST/GOOD PLAYERS: 10 rows of 13 bytes, the score in tens (3 BCD bytes) then the name on 10
// ASCII characters, dots filling the end as on screen ("T.FUJIWARA"); the top score follows. Checked on
// the game's screen (MAME 0.289) with a modified file (09 87 65 Z.AQ...... shows 987650 Z.AQ......).
@Extractor({
    name: 'higemaru'
})
export default class Higemaru extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            const row = i * 13;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 3).toHexNumber() * 10,
                name: this.hi!.slice(row + 3, 10).toString()
            });
        }
        return this;
    }
}
