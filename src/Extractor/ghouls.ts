import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 6 names (8 ASCII characters), then 6 pointers to them in rank order,
// 6 scores (4 bytes, hex digits, one per name slot), 6 score pointers and the top score. The game shows
// 5 ranks. Checked with npm run compare.
@Extractor({
    name: 'ghouls'
})
export default class Ghouls extends AbstractExtractor {
    protected charset = {0x3E: '♥', 0x3F: '/', 0x7E: '‼', 0x7F: '?'};

    extract(): this {
        const b = this.hi!.buffer;
        for (let rank = 0; rank < 5; rank++) {
            const slot = (b.readUInt32BE(48 + rank * 4) - 0xffbf4c) / 8;
            if (slot < 0 || slot > 5 || !Number.isInteger(slot)) {
                continue;
            }
            this.output.default.push({
                rank: rank + 1,
                score: this.hi!.slice(72 + slot * 4, 4).toHexNumber(),
                name: this.hi!.slice(slot * 8, 8).toString(this.charset).trim()
            });
        }
        return this;
    }
}
