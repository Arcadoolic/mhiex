import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (464 bytes), checked with npm run compare.
@Extractor({
    name: 'rygar'
})
export default class Rygar extends AbstractExtractor {
    protected charset = {
        0x5B: ' ',
        0x5C: '◉',
    };

    extract(): this {
        for (let i = 0; i < 50; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(1 + i * 9, 4).hexDigits()),
                name: this.hi!.slice(5 + i * 9, 3).toString(this.charset)
            });
        }
        return this;
    }
}
