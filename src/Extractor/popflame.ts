import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HIGH SCORE: one score, no name. Read from the 6 characters the screen shows, kept at the end of the
// file (20 is "0", 21 is "1"...), least significant first: the 3 bytes the game counts with come
// first, in an order no screen has confirmed. Checked against the game's screen (MAME 0.289), with
// a modified file loaded by the hiscore plugin (20 25 24 23 22 21 shows 123450).
@Extractor({
    name: 'popflame'
})
export default class Popflame extends AbstractExtractor {
    extract(): this {
        const digits = [...this.hi!.slice(6, 6).buffer].reverse().map(byte => byte & 0x0f).join('');
        this.output.default.push({rank: 1, score: parseInt(digits), name: ''});
        return this;
    }
}
