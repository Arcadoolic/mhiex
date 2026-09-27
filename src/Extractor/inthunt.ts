import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 12 records of 16 bytes: score (4 bytes, little-endian hex digits),
// stars, stage (2 bytes each), name (every other byte of 8); then 12 pointers (records at 0x180 + 16 * n)
// giving the rank order. Checked with npm run compare.
@Extractor({
    name: 'inthunt'
})
export default class Inthunt extends AbstractExtractor {
    extract(): this {
        const b = this.hi!.buffer;
        const order: number[] = [];
        for (let i = 0; i < 12; i++) {
            order[(b.readUInt16LE(192 + i * 2) - 0x180) / 16] = i;
        }
        const rows = [];
        for (let slot = 0; slot < 12; slot++) {
            const o = slot * 16;
            const name = this.hi!.slice(o + 8, 8).byteSkip(true).toString({0x00: ''}).trim();
            if (!name) {
                continue;
            }
            rows.push({
                order: order[slot] ?? slot,
                score: this.hi!.slice(o, 4).reverse().toHexNumber(),
                name,
                extra: {stars: b.readUInt16LE(o + 4), stage: b.readUInt16LE(o + 6) / 2 + 1}
            });
        }
        rows.sort((x, y) => x.order - y.order)
            .forEach(({order, ...s}, i) => this.output.default.push({rank: i + 1, ...s}));
        return this;
    }
}
