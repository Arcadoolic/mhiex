import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (240 bytes), checked with npm run compare.
@Extractor({
    name: 'exerion'
})
export default class Exerion extends AbstractExtractor {
    protected charset = {
        0x00: ' ',
        0x40: ' ',
        0x5B: '.',
        0x5F: ':',
    };

    extract(): this {
        for (let i = 0; i < 100; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 2, 2).hexDigits())) * 100,
                name: i < 5 ? this.hi!.slice(200 + i * 8, 3).toString(this.charset) : ''
            });
        }
        return this;
    }
}
