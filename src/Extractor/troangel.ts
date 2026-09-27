import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (33 bytes), checked with npm run compare.
@Extractor({
    name: 'troangel'
})
export default class Troangel extends AbstractExtractor {
    protected charset = {
        0x20: ' ',
        0x2E: '.',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(24 + i * -6, 3).hexDigits()),
                name: this.hi!.slice(27 + i * -6, 3).toString(this.charset)
            });
        }
        return this;
    }
}
