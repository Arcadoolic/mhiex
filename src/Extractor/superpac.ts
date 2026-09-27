import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (50 bytes), checked with npm run compare.
@Extractor({
    name: 'superpac'
})
export default class Superpac extends AbstractExtractor {
    protected charset = {
        0x40: '.',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 8, 3).hexDigits())) * 10,
                name: this.hi!.slice(4 + i * 8, 4).toString(this.charset)
            });
        }
        return this;
    }
}
