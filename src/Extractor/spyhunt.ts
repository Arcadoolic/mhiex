import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: from nvram byte 1088, 10 names (3 ASCII characters), 12 bytes, then
// 10 scores (4 bytes, hex digits). Checked with npm run compare.
@Extractor({
    name: 'spyhunt',
    hi: false,
    nvram: 'nvram'
})
export default class Spyhunt extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.nvram!.slice(1088 + 42 + i * 4, 4).toHexNumber(),
                name: this.nvram!.slice(1088 + i * 3, 3).toString().trim()
            });
        }
        return this;
    }
}
