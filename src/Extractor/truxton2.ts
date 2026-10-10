import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'truxton2'
})
export default class Truxton2 extends AbstractExtractor {
    // BEST PLAYERS: the top score, 10 scores (4 BCD bytes, tens dropped), 10 names of 3 tiles
    // (a word each, ASCII in its low byte), then 10 stages (a word)
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber() * 10,
                name: this.hi!.slice(44 + i * 6, 6).byteSkip(false).toString(),
                extra: {
                    stage: this.hi!.buffer[105 + i * 2]
                }
            });
        }
        return this;
    }
}
