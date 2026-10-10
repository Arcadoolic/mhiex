import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'upndown'
})
export default class Upndown extends AbstractExtractor {
    // TODAY'S BEST 10: 10 records of 6 bytes, score (3 BCD bytes) and name, then the top score
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 6, 3).toHexNumber(),
                name: this.hi!.slice(i * 6 + 3, 3).toString()
            });
        }
        return this;
    }
}
