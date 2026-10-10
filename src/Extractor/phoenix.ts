import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HI-SCORE, SCORE1, SCORE2: 3 bytes of decimal digits each, most significant first, each followed by
// the 6 characters the screen shows for it. One score is given, without a name: the best of the
// three. Checked against the game's screen (MAME 0.289) with a file from a real game, and with a
// game played by script: over at 800 points, it left HI-SCORE at 0 and 800 in SCORE1.
@Extractor({
    name: 'phoenix'
})
export default class Phoenix extends AbstractExtractor {
    extract(): this {
        // A game over does not move its score to HI-SCORE (the game does it later): until then, and
        // when it is quit before, the best score is one of the two players'.
        const score = Math.max(...[0, 9, 18].map(offset => parseInt(this.hi!.slice(offset, 3).hexDigits())));
        this.output.default.push({rank: 1, score, name: ''});
        return this;
    }
}
