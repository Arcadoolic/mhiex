import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (124 bytes), checked with npm run compare.
@Extractor({
    name: 'starforc'
})
export default class Starforc extends AbstractExtractor {
    protected charset = {
        0x2E: '.',
        0x40: ' ',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(2 + i * 11, 4).hexDigits()),
                name: this.hi!.slice(7 + i * 11, 3).toString(this.charset)
            });
        }
        return this;
    }
}
