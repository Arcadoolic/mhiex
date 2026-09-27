import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (128 bytes), checked with npm run compare.
@Extractor({
    name: 'p47'
})
export default class P47 extends AbstractExtractor {
    protected charset = {
        0x5B: '.',
        0x5C: ' ',
    };

    extract(): this {
        for (let i = 0; i < 8; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 16, 4).hexDigits()),
                name: this.hi!.slice(5 + i * 16, 3).toString(this.charset)
            });
        }
        return this;
    }
}
