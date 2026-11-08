import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 3 scores, no names: 6 ASCII digits each, drawn in the middle of the maze. Checked on the game's
// screen (MAME 0.289) with a modified file ("123456789012345678" shows 123456, 789012, 345678).
@Extractor({
    name: 'headon2'
})
export default class Headon2 extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 3; i++) {
            this.output.default.push({rank: i + 1, score: parseInt(this.hi!.slice(i * 6, 6).toString(), 10) || 0, name: ''});
        }
        return this;
    }
}
