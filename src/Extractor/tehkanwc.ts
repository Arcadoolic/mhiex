import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST PLAYERS: 12 rows of 8 bytes: the games won (05 shows 6TH GAME WINNER: the score is the game
// reached, games won + 1), 3 ASCII letters, the last game's result (2 bytes, 3:2) then 00 17. Checked
// on the game's screen (MAME 0.289) with a modified file (05 ZAQ 03 02 shows 6TH GAME WINNER ZAQ 3:2).
@Extractor({
    name: 'tehkanwc'
})
export default class Tehkanwc extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 12; i++) {
            const row = i * 8;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer[row] + 1,
                name: this.hi!.slice(row + 1, 3).toString(),
                extra: {
                    result: `${this.hi!.buffer[row + 4]}:${this.hi!.buffer[row + 5]}`
                }
            });
        }
        return this;
    }
}
