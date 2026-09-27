import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP TEN: 10 scores (2 bytes, little-endian hex digits, x100) and 10 names (3 letters, A = 0, 1A =
// space). Layout from hi2txt's definition. The MAME 0.289 hiscore.dat entry saves the scores first
// (c924) for elim2; elim4 saves the names first (see elim4.ts).
@Extractor({
    name: 'elim2'
})
export default class Elim2 extends AbstractExtractor {
    protected charset = {
        0x1A: ' ',
    };
    protected scoresFirst = true;

    extract(): this {
        const scores = this.scoresFirst ? 0 : 30;
        const names = this.scoresFirst ? 20 : 0;
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(scores + i * 2, 2).reverse().hexDigits()) * 100,
                name: this.hi!.slice(names + i * 3, 3).toString(this.charset, 65)
            });
        }
        return this;
    }
}
