import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (143 bytes), checked with npm run compare.
@Extractor({
    name: 'yiear'
})
export default class Yiear extends AbstractExtractor {
    protected charset = {
        0x10: ' ',
        0x2B: '.',
        0x2C: '=',
        0x2D: '!',
        0x2E: '&square;',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 14, 3).hexDigits())) * 10,
                name: this.hi!.slice(4 + i * 14, 10).toString(this.charset, 48)
            });
        }
        return this;
    }
}
