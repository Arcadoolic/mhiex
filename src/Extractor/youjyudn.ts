import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (55 bytes), checked with npm run compare.
@Extractor({
    name: 'youjyudn'
})
export default class Youjyudn extends AbstractExtractor {
    protected charset = {
        0x5B: '.',
        0x5C: '!',
        0x5D: '&mens-symbol;',
        0x5E: '♀',
        0x64: ' ',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 11, 3).reverse().hexDigits())) * 10,
                name: this.hi!.slice(3 + i * 11, 8).toString(this.charset)
            });
        }
        return this;
    }
}
