import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HI-SCORE, SCORE1, SCORE2: 3 bytes of decimal digits each, most significant first, as phoenix (same
// hardware, same hiscore.dat entry); the best of the three is given, without a name. Checked against
// the game's screen (MAME 0.289), with a modified file loaded by the hiscore plugin (12 34 50 shows
// 123450), and with a game played by script: over at 60 points, it left HI-SCORE at 0 and 60 in
// SCORE1 (the demo file).
@Extractor({
    name: 'pleiadce'
})
export default class Pleiadce extends AbstractExtractor {
    extract(): this {
        // A game over does not move its score to HI-SCORE (the game does it later): until then, and
        // when it is quit before, the best score is one of the two players'.
        const score = Math.max(...[0, 9, 18].map(offset => parseInt(this.hi!.slice(offset, 3).hexDigits())));
        this.output.default.push({rank: 1, score, name: ''});
        return this;
    }
}
