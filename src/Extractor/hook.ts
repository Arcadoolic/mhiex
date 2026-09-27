import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// BEST 3 PLAYERS for each of the 5 characters: 15 records of 16 bytes, score (6 bytes, one digit each,
// little-endian), 00 00 00, name (3 ASCII characters), then FF padding (the MAME 0.289 hiscore.dat
// entry cuts the last one). Default: the tables merged by score, the character in extra; each
// character's table in extras. Checked against the game's BEST 3 PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'hook'
})
export default class Hook extends AbstractExtractor {
    protected characterNames = ['peterpan', 'rufio', 'ace', 'pockets', 'thudbutt'];

    extract(): this {
        const all: Score[] = [];
        this.output.extras = {};
        for (let c = 0; c < 5; c++) {
            const table = [];
            for (let r = 0; r < 3; r++) {
                const offset = (c * 3 + r) * 16;
                table.push({
                    rank: r + 1,
                    score: parseInt(this.hi!.slice(offset, 6).reverse().hexDigits('odd')),
                    name: this.hi!.slice(offset + 9, 3).toString({0x00: ' '}).trim(),
                    extra: {character: this.characterNames[c]}
                });
            }
            this.output.extras[this.characterNames[c]] = table.map(({extra, ...score}) => score);
            all.push(...table);
        }
        all.sort((a, b) => b.score - a.score).forEach((s, i) => this.output.default.push({...s, rank: i + 1}));
        return this;
    }
}
