import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: from nvram byte 1284, 10 names (2 ASCII characters, then the level
// reached), the top score, 7 bytes, then 10 scores (3 bytes, hex digits). Checked with npm run compare.
@Extractor({
    name: 'tron',
    hi: false,
    nvram: 'nvram'
})
export default class Tron extends AbstractExtractor {
    protected levels = ['RPG', 'COBOL', 'BASIC', 'FORTRAN', 'SNOBOL', 'PL1', 'PASCAL', 'ALGOL', 'ASSEMBLY', 'OS', 'JCL', 'USER'];

    extract(): this {
        for (let i = 0; i < 10; i++) {
            const level = this.nvram!.buffer[1284 + i * 3 + 2];
            this.output.default.push({
                rank: i + 1,
                score: this.nvram!.slice(1284 + 40 + i * 3, 3).toHexNumber(),
                name: this.nvram!.slice(1284 + i * 3, 2).toString().trim(),
                extra: {level: this.levels[level] ?? level}
            });
        }
        return this;
    }
}
