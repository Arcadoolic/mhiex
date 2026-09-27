import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (60 bytes), checked with npm run compare.
@Extractor({
    name: 'bzone'
})
export default class Bzone extends AbstractExtractor {
    protected charset = {
        0x00: ' ',
        0x4A: ' ',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: (parseInt(this.hi!.slice(i * 3, 2).reverse().hexDigits())) * 1000,
                name: this.hi!.slice(30 + i * 3, 3).toString(this.charset, 54, 2)
            });
        }
        return this;
    }
}
