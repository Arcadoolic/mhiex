import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// Two tables of 11 rows (the champion, then RANKING 1 to 10) of 6 bytes: a count, 3 letters in ASCII,
// then two wrestlers. WWF TOP RANKING TAG TEAMS (default): the count is the stage reached minus 1, the
// row names the team. WWF ROYAL RUMBLE (extras.royalRumble): the count is the number of wrestlers beaten,
// the row names its first wrestler. Checked on the game's screen (MAME 0.289) with modified files
// (ZAQ, 0C shows BEAT 12; wrestlers 10 and 11 show SMASH and CRUSH DEMOLITION). Wrestlers 4 and 5 are
// printed blank on the ranking: the Legion of Doom, the only other team of the game.
const WRESTLERS: {[id: number]: string} = {
    0: 'HULK HOGAN',
    1: 'ULTIMATE WARRIOR',
    2: 'JAKE ROBERTS',
    3: 'BIG BOSS MAN',
    4: 'LEGION OF DOOM',
    5: 'LEGION OF DOOM',
    6: 'SGT. SLAUGHTER',
    7: 'MR. PERFECT',
    8: 'EARTHQUAKE',
    9: 'TED DIBIASE',
    10: 'SMASH',
    11: 'CRUSH',
};

@Extractor({
    name: 'wwfwfest'
})
export default class Wwfwfest extends AbstractExtractor {
    private table(offset: number, tagTeam: boolean): Score[] {
        const rows: Score[] = [];
        for (let i = 0; i < 11; i++) {
            const row = offset + i * 6;
            const count = this.hi!.slice(row, 1).readIntBE();
            const first = WRESTLERS[this.hi!.slice(row + 4, 1).readIntBE()] ?? '?';
            const second = WRESTLERS[this.hi!.slice(row + 5, 1).readIntBE()] ?? '?';
            rows.push({
                rank: i + 1,
                score: tagTeam ? count + 1 : count,
                name: this.hi!.slice(row + 1, 3).toString(),
                extra: tagTeam ? {stage: count + 1, wrestlers: `${first} & ${second}`} : {beaten: count, wrestler: first}
            });
        }
        return rows;
    }

    extract(): this {
        this.output.default = this.table(0, true);
        this.output.extras = {royalRumble: this.table(66, false)};
        return this;
    }
}
