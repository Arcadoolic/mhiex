import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (176 bytes), checked with npm run compare.
@Extractor({
    name: 'battroad'
})
export default class Battroad extends AbstractExtractor {
    protected charset = {
        0x1A: '!',
        0x1B: '.',
        0x1C: ',',
        0x1D: '-',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(16 + i * 16, 6).decodeBCDLE(),
                name: this.hi!.slice(24 + i * 16, 8).toString(this.charset, 65)
            });
        }
        return this;
    }
}
