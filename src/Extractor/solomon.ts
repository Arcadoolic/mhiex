import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (90 bytes), checked with npm run compare.
@Extractor({
    name: 'solomon'
})
export default class Solomon extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUIntLE(i * 9, 4),
                name: this.hi!.slice(4 + i * 9, 3).toString()
            });
        }
        return this;
    }
}
