import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (66 bytes), checked with npm run compare.
@Extractor({
    name: 'rtypeleo'
})
export default class Rtypeleo extends AbstractExtractor {
    protected charset = {
        0x00: '',
        0x5B: '-',
        0x5C: '&mid-dot;',
    };

    extract(): this {
        for (let i = 0; i < 7; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 8, 3).reverse().hexDigits())) * 10,
                name: this.hi!.slice(3 + i * 8, 5).toString(this.charset)
            });
        }
        return this;
    }
}
