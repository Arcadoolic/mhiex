import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// CWA OFFICIAL RATINGS, two tables of 11 rows (CHAMP, then 1st to 10th) of 8 bytes: the score in 4 BCD
// bytes, 3 letters in ASCII, then the wrestler (index of the portrait). SINGLE MATCH is the default
// table, "TEAM" BATTLE ROYAL follows (extras.teamBattleRoyal). Checked on the game's screen (MAME 0.289)
// with a modified file (00 98 76 50 ZAQ as single match champion, 00 12 34 50 XYZ as team one).
@Extractor({
    name: 'slammast'
})
export default class Slammast extends AbstractExtractor {
    private table(first: number): Score[] {
        const rows: Score[] = [];
        for (let i = 0; i < 11; i++) {
            const row = (first + i) * 8;
            rows.push({
                rank: i + 1,
                score: this.hi!.slice(row, 4).toHexNumber(),
                name: this.hi!.slice(row + 4, 3).toString(),
                extra: {
                    character: this.hi!.slice(row + 7, 1).readIntBE()
                }
            });
        }
        return rows;
    }

    extract(): this {
        this.output.default = this.table(0);
        this.output.extras = {teamBattleRoyal: this.table(11)};
        return this;
    }
}
