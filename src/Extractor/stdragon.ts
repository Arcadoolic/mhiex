import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (128 bytes), checked with npm run compare.
@Extractor({
    name: 'stdragon'
})
export default class Stdragon extends AbstractExtractor {
    protected charset = {
        0x00: ' ',
        0xBB: '-',
        0xBC: '*',
        0xBD: '/',
        0xBE: '&black-heart;',
        0xBF: '&mid-dot;',
        0xDB: '.',
        0xDC: ' ',
    };

    extract(): this {
        for (let i = 0; i < 8; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 16, 4).hexDigits()),
                name: this.hi!.slice(6 + i * 16, 6).byteSkip(false).toString(this.charset, -128)
            });
        }
        return this;
    }
}
