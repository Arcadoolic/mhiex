import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'tnzs'
})
export default class Tnzs extends AbstractExtractor {
    // 5 records of 7 bytes: score (3 BCD bytes, tens dropped), round (counted from 0 over worlds
    // of 4: 5 is shown as "2-2") and name
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const round = this.hi!.buffer[i * 7 + 3];
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 7, 3).toHexNumber() * 10,
                name: this.hi!.slice(i * 7 + 4, 3).toString(),
                extra: {
                    round: `${Math.floor(round / 4) + 1}-${round % 4 + 1}`
                }
            });
        }
        return this;
    }
}
