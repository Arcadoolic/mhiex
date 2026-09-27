import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (75 bytes), checked with npm run compare.
@Extractor({
    name: 'terracre'
})
export default class Terracre extends AbstractExtractor {
    protected charset = {
        0x00: ' ',
        0x01: '!',
        0x04: ';',
        0x06: '&',
        0x0A: '*',
        0x0C: ',',
        0x0E: '.',
        0x1D: '-',
        0x1F: '?',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 14, 4).hexDigits()),
                name: this.hi!.slice(4 + i * 14, 10).toString(this.charset, 32)
            });
        }
        return this;
    }
}
