import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 11 bytes: score (3 bytes, hex digits, x100), name (8 ASCII characters); the MAME
// 0.289 hiscore.dat entry cuts the 10th name after 3 characters. Then the top score. Checked against
// the game's BEST 10 PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'kidniki'
})
export default class Kidniki extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 11, 3).toHexNumber() * 100,
                name: this.hi!.slice(i * 11 + 3, i < 9 ? 8 : 3).toString({0x00: ' '}).trim()
            });
        }
        return this;
    }
}
