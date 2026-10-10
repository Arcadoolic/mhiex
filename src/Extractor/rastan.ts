import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'rastan'
})
export default class Rastan extends AbstractExtractor {
    // The top score, 5 scores (3 BCD bytes, least significant first, tens and units dropped),
    // 5 rounds, then 5 names
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(3 + i * 3, 3).reverse().toHexNumber() * 100,
                name: this.hi!.slice(23 + i * 3, 3).toString(),
                extra: {
                    round: this.hi!.buffer[18 + i]
                }
            });
        }
        return this;
    }
}
