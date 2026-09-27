import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'punchout',
    // The 0.289 hiscore.dat entry expects 04 as the table's last byte, the game leaves 03 there:
    // the hiscore plugin never writes punchout.hi. The nvram ranking is enough on its own.
    hi: 'optional',
    nvram: 'nvram'
})
export default class Punchout extends AbstractExtractor {
    protected nvramRanks = 40;
    protected hiRanks = 10;

    extract(): this {
        this.extractNvram();
        if (this.hi) {
            this.extractHi();
        }
        return this;
    }

    protected extractNvram() {
        let currentByte = 30;
        for (let i = 0; i < this.nvramRanks; i++) {
            this.scores.default.push({
                rank: i + 1,
                name: this.nvram!.slice(currentByte, 6).byteSwap(2).nibbleSkip(false).toString({}, 55),
                score: this.nvram!.slice(currentByte + 6, 6).nibbleSkip(false).toHexNumber(true)
            });
            currentByte += 12;
        }
    }

    protected extractHi() {
        let rank = this.scores.default.length;
        for (let i = 0; i < this.hiRanks && i * 8 + 8 <= this.hi!.buffer.length; i++) {
            this.scores.default.push({
                rank: rank + i + 1,
                name: this.hi!.slice(i * 8 + 2, 3).toString({}, 55),
                score: parseInt(this.hi!.slice(i * 8 + 5, 3).readIntLE().toString(16))
            });
        }
    }
}
