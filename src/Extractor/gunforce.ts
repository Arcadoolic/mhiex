import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (65 bytes), checked with npm run compare.
@Extractor({
    name: 'gunforce'
})
export default class Gunforce extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUIntLE(i * 13, 4),
                name: this.hi!.slice(4 + i * 13, 8).toString()
            });
        }
        return this;
    }
}
