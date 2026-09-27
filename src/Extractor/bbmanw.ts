import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// A header byte, then the BEST 5 RANKING: 5 records of 11 bytes, world - 1 and stage - 1 (1 byte
// each), score (3 bytes, little-endian hex digits, x10), name (6). The VS GAME BEST 5 that follows
// ranks win rates, not scores: left out. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'bbmanw'
})
export default class Bbmanw extends AbstractExtractor {
    protected charset = {
        0x63: '&black-heart;',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const currentByte = 1 + i * 11;
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(currentByte + 2, 3).reverse().hexDigits()) * 10,
                name: this.hi!.slice(currentByte + 5, 6).toString(this.charset),
                extra: {
                    stage: `${this.hi!.buffer[currentByte] + 1}-${this.hi!.buffer[currentByte + 1] + 1}`
                }
            });
        }
        return this;
    }
}
