import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 10 records of 16 bytes: score (6 bytes, one digit each, x10), speed
// (1 NORM, 2 HIGH), 1 byte, name (3 characters, A = 1), 5 bytes. Checked with npm run compare.
@Extractor({
    name: 'drmario'
})
export default class Drmario extends AbstractExtractor {
    protected charset = {0x00: ' ', 0x1B: '0', 0x1C: '1', 0x1D: '2', 0x1E: '3', 0x1F: '4', 0x20: '5', 0x21: '6', 0x22: '7', 0x23: '8', 0x24: '9', 0x25: '-', 0x26: ',', 0x27: "'", 0x28: '➡', 0x29: '!', 0x2A: '♥', 0x2B: '.'};

    extract(): this {
        for (let i = 0; i < 10; i++) {
            const o = i * 16;
            const speed = this.hi!.buffer[o + 6];
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(o, 6).hexDigits('odd')) * 10,
                name: this.hi!.slice(o + 8, 3).toString(this.charset, 0x40).trim(),
                extra: {speed: speed === 2 ? 'HIGH' : speed === 1 ? 'NORM' : speed}
            });
        }
        return this;
    }
}
