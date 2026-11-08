import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// HIGH SCORES, 1 PLAYER (default) and 2 PLAYERS (extras.twoPlayers), 5 rows each: the scores are 3 BCD
// bytes, least significant first, in tens (slots 0-4 for 2 players, 5-9 for 1 player), the names 3
// letters (0x0B is A; the top row has none) from byte 0x3C for 2 players, 0x4B for 1 player. Checked
// on the game's screen (MAME 0.289) with a modified file (12 34 56 in slot 6 shows 5634120, names ZAQ
// and XYZ on the second rows).
@Extractor({
    name: 'spacduel'
})
export default class Spacduel extends AbstractExtractor {
    protected charset = {
        0x00: ' ',
    };

    private table(scores: number, names: number): Score[] {
        const rows: Score[] = [];
        for (let i = 0; i < 5; i++) {
            rows.push({
                rank: i + 1,
                score: this.hi!.slice((scores + i) * 3, 3).reverse().toHexNumber() * 10,
                name: this.hi!.slice(names + i * 3, 3).toString(this.charset, 0x36).trim()
            });
        }
        return rows;
    }

    extract(): this {
        this.output.default = this.table(5, 0x4B);
        this.output.extras = {twoPlayers: this.table(0, 0x3C)};
        return this;
    }
}
