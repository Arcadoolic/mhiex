import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// HALL OF SUPER HEROES: SCORE, VS and TIME RANKING, 5 records of 10 bytes each: value (4 bytes, hex
// digits: the score; the wins in the first 2 bytes; the time as 00 min sec 1/100), character, 00,
// name (3 letters, A = 0). Score ranking as default, the others in extras (time in seconds). Checked
// against the game's three screens (MAME 0.289).
@Extractor({
    name: 'msh'
})
export default class Msh extends AbstractExtractor {
    protected characterNames: {[key: number]: string} = {
        0x00: 'spiderman', 0x02: 'captainamerica', 0x04: 'hulk', 0x06: 'ironman', 0x08: 'wolverine',
        0x0A: 'psylocke', 0x0C: 'blackheart', 0x0E: 'shumagorath', 0x10: 'juggernaut', 0x12: 'magneto',
    };

    protected table(offset: number, value: (o: number) => number, scoreSuffix?: string): Score[] {
        const scores: Score[] = [];
        for (let i = 0; i < 5; i++) {
            const o = offset + i * 10;
            const character = this.hi!.buffer[o + 4];
            scores.push({
                rank: i + 1,
                score: value(o),
                name: this.hi!.slice(o + 6, 3).toString({}, 0x41),
                ...(scoreSuffix ? {scoreSuffix} : {}),
                extra: {character: this.characterNames[character] ?? character}
            });
        }
        return scores;
    }

    extract(): this {
        this.output.default = this.table(0, o => this.hi!.slice(o, 4).toHexNumber());
        this.output.extras = {
            vs: this.table(50, o => this.hi!.slice(o, 2).toHexNumber(), 'wins'),
            time: this.table(100, o => this.hi!.slice(o + 1, 1).toHexNumber() * 60
                + this.hi!.slice(o + 2, 1).toHexNumber() + this.hi!.slice(o + 3, 1).toHexNumber() / 100, 'sec'),
        };
        return this;
    }
}
