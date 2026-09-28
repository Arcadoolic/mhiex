import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 16 bytes: score (7 ASCII characters), name (8 ASCII characters, 0x5C '·', 0x5D '♥'),
// 00; the MAME 0.289 hiscore.dat entry cuts the 10th record's 00. Checked against the game's SCORE
// RANKING TOP 10 screen (MAME 0.289).
@Extractor({
    name: 'momoko'
})
export default class Momoko extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 16, 7).toString()),
                name: this.hi!.slice(i * 16 + 7, 8).toString({0x5C: '·', 0x5D: '♥'}).trim()
            });
        }
        return this;
    }
}
