import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

// THE HIGH SCORES ARE: 3 SHIPS (default) and 6 SHIPS (extras.sixShips), 5 scores each, no names: 3 BCD
// bytes, least significant first. 3 ships from byte 0, 6 ships from byte 19. Checked on the game's
// screen (MAME 0.289) with a file holding 00 01 02... 33: 3 SHIPS shows 20100, 50403... and 6 SHIPS
// 212019, 242322...
@Extractor({
    name: 'gorf'
})
export default class Gorf extends AbstractExtractor {
    private table(offset: number): Score[] {
        const rows: Score[] = [];
        for (let i = 0; i < 5; i++) {
            rows.push({rank: i + 1, score: this.hi!.slice(offset + i * 3, 3).reverse().toHexNumber(), name: ''});
        }
        return rows;
    }

    extract(): this {
        this.output.default = this.table(0);
        this.output.extras = {sixShips: this.table(19)};
        return this;
    }
}
