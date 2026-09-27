import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 50 records of 12 bytes: score (4 bytes, hex digits), name (3
// characters, A = 0, step 2), character, level, rank (2 bytes), 1 byte. Checked with npm run compare.
@Extractor({
    name: 'knights'
})
export default class Knights extends AbstractExtractor {
    protected charset = {0x34: '!', 0x36: '·', 0x38: ' '};
    protected characterNames = ['lancelot', 'arthur', 'perceval'];

    extract(): this {
        for (let i = 0; i < 50; i++) {
            const o = i * 12;
            const b = this.hi!.buffer;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 4).toHexNumber(),
                name: this.hi!.slice(o + 4, 3).toString(this.charset, 0x41, 2).trim(),
                extra: {character: this.characterNames[b[o + 7]] ?? b[o + 7], level: b[o + 8] + 1}
            });
        }
        return this;
    }
}
