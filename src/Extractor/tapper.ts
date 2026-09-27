import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (domino, shared by the Bally Midway MCR games): nvram byte 20 on, 10
// records of 6 bytes: name (3 ASCII characters), score (3 bytes, hex digits). Slots scoring 0 are left
// out. Checked with npm run compare.
@Extractor({
    name: 'tapper',
    hi: false,
    nvram: 'nvram'
})
export default class Tapper extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            const o = 20 + i * 6;
            const score = this.nvram!.slice(o + 3, 3).toHexNumber();
            if (score) {
                this.output.default.push({rank: i + 1, score, name: this.nvram!.slice(o, 3).toString().trim()});
            }
        }
        return this;
    }
}
