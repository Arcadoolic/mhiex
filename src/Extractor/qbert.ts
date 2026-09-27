import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'qbert',
    hi: false,
    nvram: 'nvram'
})
export default class Qbert extends AbstractExtractor {
    protected charset = {
        0x24: ' ',
        0x25: '.',
    };

    extract(): this {
        let currentByte = 2562;
        for (let i = 22; i >= 0; i--) {
            this.scores.default.unshift({
                rank: i + 1,
                name: this.nvram!.slice(currentByte, 3).toString(this.charset, 55),
                score: this.nvram!.slice(currentByte + 3, 7).byteFilter(0x24).nibbleSkip().toHexNumber()
            });
            currentByte += 10;
        }
        return this;
    }
}
