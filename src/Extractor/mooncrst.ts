import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (85 bytes), checked with npm run compare.
@Extractor({
    name: 'mooncrst'
})
export default class Mooncrst extends AbstractExtractor {
    protected charset = {
        0x24: ' ',
        0x2C: '.',
        0xFF: '',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 3, 3).hexDigits()),
                name: this.logo(this.hi!.slice(18 + i * 14, 10).toString(this.charset, 55))
            });
        }
        return this;
    }

    // The default names are the Nichibutsu logo, drawn with tiles
    protected logo(name: string): string {
        return name === 'usqomkig  ' ? 'Nichibutsu' : name.trimEnd();
    }
}
