import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (50 bytes), checked with npm run compare.
@Extractor({
    name: 'moonqsr'
})
export default class Moonqsr extends AbstractExtractor {
    protected charset = {
        0x33: '.',
        0x00: '',
        0x9F: '',
        0xFF: '',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 3, 3).hexDigits()),
                name: this.hi!.slice(18 + i * 7, 3).toString(this.charset, 55)
            });
        }
        return this;
    }
}
