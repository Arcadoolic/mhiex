import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'grindstm'
})
export default class Grindstm extends AbstractExtractor {
    // TOP PLAYERS: 8 scores (4 BCD bytes), 8 names of 6 characters (a word each, ASCII in its
    // low byte), then 8 areas (a word, a percentage)
    extract(): this {
        for (let i = 0; i < 8; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber(),
                name: this.hi!.slice(32 + i * 12, 12).byteSkip(false).toString(),
                extra: {
                    area: this.hi!.buffer.readUInt16BE(128 + i * 2)
                }
            });
        }
        return this;
    }
}
