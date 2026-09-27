import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'avspirit'
})
export default class Avspirit extends AbstractExtractor {
    extract(): this {
        // The top score (4 bytes), then 10 records of 8 bytes: score (4, hex digits), name (3), padding (1).
        // The game's "TODAY'S HI SCORE" screen shows the scores only.
        for (let i = 0; i < 10; i++) {
            const currentByte = 4 + i * 8;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(currentByte, 4).toHexNumber(),
                name: this.hi!.slice(currentByte + 4, 3).toString()
            });
        }
        return this;
    }
}
