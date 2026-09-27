import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 1 byte, then 6 arrays of 250 bytes stored from the last rank to
// the first: score low, middle and high bytes (hex digits), name first, second and third letters (A =
// 0x0A); then 1 byte. Checked with npm run compare.
@Extractor({
    name: 'ccastles'
})
export default class Ccastles extends AbstractExtractor {
    protected charset = {0x64: ' ', 0x65: '?', 0x66: '/', 0x67: '?', 0x68: ':', 0x69: '?'};

    extract(): this {
        const b = this.hi!.buffer;
        for (let rank = 1; rank <= 250; rank++) {
            const i = 1 + 250 - rank;
            const score = parseInt(Buffer.from([b[i + 500], b[i + 250], b[i]]).toString('hex'));
            if (!score) {
                continue;
            }
            this.output.default.push({
                rank,
                score,
                name: [750, 1000, 1250]
                    .map(o => this.hi!.slice(i + o, 1).toString(this.charset, -9)).join('').trim()
            });
        }
        return this;
    }
}
