import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'rallybik'
})
export default class Rallybik extends AbstractExtractor {
    // TOP PLAYERS: the top score, 40 scores (4 BCD bytes), 40 names (6 words each, ASCII in the
    // low byte; the game shows the first 3), then 40 areas (a word: the number of the city
    // reached, 0 shown as RETIRE)
    extract(): this {
        for (let i = 0; i < 40; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(164 + i * 12, 6).byteSkip(false).toString(),
                extra: {
                    area: this.hi!.buffer.readUInt16BE(644 + i * 2)
                }
            });
        }
        return this;
    }
}
