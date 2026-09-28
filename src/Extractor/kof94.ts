import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Neo-Geo saveram ranking, layout from hi2txt's definition: the file's 16-bit words are byte-swapped,
// then from tableOffset, `count` records of recordSize bytes: score (scoreSize bytes, hex digits), and
// the name (3 ASCII characters) at nameAt. Checked with npm run compare.
@Extractor({
    name: 'kof94',
    hi: false,
    nvram: 'saveram'
})
export default class Kof94 extends AbstractExtractor {
    protected tableOffset = 804;
    protected count = 5;
    protected recordSize = 8;
    protected scoreSize = 4;
    protected nameAt = 4;

    extract(): this {
        const ram = this.nvram!.slice(this.tableOffset, this.count * this.recordSize).byteSwap(2);
        for (let i = 0; i < this.count; i++) {
            const o = i * this.recordSize;
            this.output.default.push({
                rank: i + 1,
                score: ram.slice(o, this.scoreSize).toHexNumber(),
                name: ram.slice(o + this.nameAt, 3).toString().trim()
            });
        }
        return this;
    }
}
