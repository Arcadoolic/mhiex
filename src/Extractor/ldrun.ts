import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (200 bytes), checked with npm run compare.
@Extractor({
    name: 'ldrun'
})
export default class Ldrun extends AbstractExtractor {
    protected charset = {
        0x5B: '.',
    };

    extract(): this {
        for (let i = 0; i < 20; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(190 + i * -10, 3).hexDigits()),
                name: this.hi!.slice(193 + i * -10, 3).toString(this.charset)
            });
        }
        return this;
    }
}
