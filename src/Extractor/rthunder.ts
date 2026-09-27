import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (38 bytes), checked with npm run compare.
@Extractor({
    name: 'rthunder'
})
export default class Rthunder extends AbstractExtractor {
    protected charset = {
        0x24: '?',
        0x25: '!',
        0x26: '.',
        0x27: ',',
        0x28: ':',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 7, 3).hexDigits())) * 10,
                name: this.hi!.slice(4 + i * 7, 3).toString(this.charset, 55)
            });
        }
        return this;
    }
}
