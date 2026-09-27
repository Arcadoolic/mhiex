import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (65 bytes), checked with npm run compare.
@Extractor({
    name: 'cclimber'
})
export default class Cclimber extends AbstractExtractor {
    protected charset = {
        0x2C: ' ',
        0x52: ' ',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 13, 3).hexDigits()),
                name: this.logo(this.hi!.slice(3 + i * 13, 10).toString(this.charset, 55))
            });
        }
        return this;
    }

    // The default names are the Nichibutsu logo, drawn with tiles
    protected logo(name: string): string {
        return name === 'ghijklmn  ' ? 'Nichibutsu' : name;
    }
}
