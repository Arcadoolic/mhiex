import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 13 bytes, 10th rank first: score (3 bytes, hex digits x100), name (10 characters,
// centered), then the top score (3 bytes). Checked against the game's BEST 10 screen (MAME 0.289).
@Extractor({
    name: 'galivan'
})
export default class Galivan extends AbstractExtractor {
    protected charset = {
        0x3F: '.',
    };

    extract(): this {
        for (let rank = 1; rank <= 10; rank++) {
            const currentByte = (10 - rank) * 13;
            this.output.default.push({
                rank,
                score: this.hi!.slice(currentByte, 3).toHexNumber() * 100,
                name: this.hi!.slice(currentByte + 3, 10).toString(this.charset).trim()
            });
        }
        return this;
    }
}
