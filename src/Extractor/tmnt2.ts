import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (60 bytes), checked with npm run compare.
@Extractor({
    name: 'tmnt2'
})
export default class Tmnt2 extends AbstractExtractor {
    protected charset = {
        0x40: ' ',
        0x5B: ',',
        0x5C: '\\',
        0x5D: '?',
        0x5E: '!',
        0x5F: '.',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 2, 2).hexDigits()),
                name: this.hi!.slice(20 + i * 4, 3).toString(this.charset)
            });
        }
        return this;
    }
}
