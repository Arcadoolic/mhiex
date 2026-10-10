import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP: one score per game type, no name: 3 bytes each, decimal digits, least significant first, of
// which the screen shows the last 5 digits. The file holds them in the order C, B, A. A is the game a
// coin starts and is the default table; B, the one the attract mode shows, and C are extras. Checked
// against the game's screen (MAME 0.289), with a modified file loaded by the hiscore plugin
// (11 11 11 22 22 22 33 33 33 shows TOP-33333 for A, TOP-22222 for B); C by elimination.
@Extractor({
    name: 'spacefev'
})
export default class Spacefev extends AbstractExtractor {
    extract(): this {
        const top = (offset: number) => ({rank: 1, score: parseInt(this.hi!.slice(offset, 3).reverse().hexDigits()) % 100000, name: ''});
        this.output.default.push(top(6));
        this.output.extras = {B: [top(3)], C: [top(0)]};
        return this;
    }
}
