import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (53 bytes), checked with npm run compare.
@Extractor({
    name: 'dspirit'
})
export default class Dspirit extends AbstractExtractor {
    protected charset = {
        0xA1: '',
        0x81: '',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 10, 3).hexDigits())) * 10,
                name: this.hi!.slice(3 + i * 10, 6).toString(this.charset)
            });
        }
        return this;
    }
}
