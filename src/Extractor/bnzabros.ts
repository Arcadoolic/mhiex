import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'bnzabros'
})
export default class Bnzabros extends AbstractExtractor {
    // SUPER GANGS: 10 records of 16 bytes, score (4 BCD bytes), stage (BCD), name (3 characters),
    // 8 spaces
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 16, 4).toHexNumber(),
                name: this.hi!.slice(i * 16 + 5, 3).toString(),
                extra: {
                    stage: this.hi!.slice(i * 16 + 4, 1).toHexNumber()
                }
            });
        }
        return this;
    }
}
