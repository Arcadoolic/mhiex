import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (56 bytes), checked with npm run compare.
@Extractor({
    name: 'stinger'
})
export default class Stinger extends AbstractExtractor {
    protected charset = {
        0x10: ' ',
        0x2B: '.',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (this.hi!.slice(i * 6, 6).decodeBCDLE()) * 10,
                name: this.hi!.slice(36 + i * 4, 4).toString(this.charset, 48)
            });
        }
        return this;
    }
}
