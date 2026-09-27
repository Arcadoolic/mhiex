import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (87 bytes), checked with npm run compare.
@Extractor({
    name: 'scion'
})
export default class Scion extends AbstractExtractor {
    protected charset = {
        0x10: ' ',
        0x2B: '.',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (this.hi!.slice(i * 16, 6).decodeBCD()) * 10,
                name: this.hi!.slice(6 + i * 16, 10).toString(this.charset, 48)
            });
        }
        return this;
    }
}
