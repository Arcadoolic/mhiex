import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'ninjaw'
})
export default class Ninjaw extends AbstractExtractor {
    // BEST 50 PLAYERS: records of 10 bytes, score (3 bytes, binary), name and 4 bytes. The file
    // goes on past the 50 rows the game ranks.
    extract(): this {
        for (let i = 0; i < 50; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUIntBE(i * 10, 3),
                name: this.hi!.slice(i * 10 + 3, 3).toString()
            });
        }
        return this;
    }
}
