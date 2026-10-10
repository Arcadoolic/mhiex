import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HI-SCORE: one score, no name. The file is the 8 characters of the side panel's score line, its
// right half first: a digit is in the low 4 bits (00 to 09, and 30 for the last 0), 40 is a blank.
// 00 00 00 30 40 40 40 02, the game's default, reads "   20000". Checked against the game's screen
// (MAME 0.289), with a modified file loaded by the hiscore plugin (03 04 05 30 40 40 01 02 shows
// 123450).
@Extractor({
    name: 'rallyx'
})
export default class Rallyx extends AbstractExtractor {
    extract(): this {
        const line = [...this.hi!.slice(4, 4).buffer, ...this.hi!.slice(0, 4).buffer];
        const digits = line.filter(byte => byte !== 0x40).map(byte => byte & 0x0f).join('');
        this.output.default.push({rank: 1, score: parseInt(digits || '0'), name: ''});
        return this;
    }
}
