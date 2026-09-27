import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 32 bytes: rank (+4, 2 digits), score (+8, 6 digits, one per byte, 0A for 0), name
// (+16, 8 characters: A = 0x0B, 0x25 '.'). The MAME 0.289 hiscore.dat entry cuts the 10th record
// after its name. Checked against the game's SCORE TABLE screen (MAME 0.289).
@Extractor({
    name: 'formatz'
})
export default class Formatz extends AbstractExtractor {
    protected charset = {0x00: ' ', 0x25: '.'};

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 32 + 8, 6).byteMap(b => b % 10).hexDigits('odd')),
                name: this.hi!.slice(i * 32 + 16, 8).toString(this.charset, 0x36).trim()
            });
        }
        return this;
    }
}
