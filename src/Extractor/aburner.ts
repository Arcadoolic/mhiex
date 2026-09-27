import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'aburner'
})
export default class Aburner extends AbstractExtractor {
    extract(): this {
        // 20 records of 14 bytes: score (4, hex digits, x10), name (4), hits (2), medals (2), separator (2)
        for (let i = 0; i < 20; i++) {
            const currentByte = i * 14;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(currentByte, 4).toHexNumber() * 10,
                name: this.hi!.slice(currentByte + 4, 4).toString(),
                extra: {
                    hits: this.hi!.slice(currentByte + 8, 2).toHexNumber(),
                    medals: this.hi!.slice(currentByte + 10, 2).toHexNumber()
                }
            });
        }
        return this;
    }
}
