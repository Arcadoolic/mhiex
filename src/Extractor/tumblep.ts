import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'tumblep'
})
export default class Tumblep extends AbstractExtractor {
    // BEST PLAYERS: 20 records of 8 bytes, name (3 characters and a null byte) and score (4 BCD
    // bytes, tens and units dropped). Then the top score.
    extract(): this {
        for (let i = 0; i < 20; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8 + 4, 4).toHexNumber() * 100,
                name: this.hi!.slice(i * 8, 3).toString()
            });
        }
        return this;
    }
}
