import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 10 records of 8 bytes: score (4 bytes, hex digits), name (3 ASCII
// characters), character; the MAME 0.289 hiscore.dat entry cuts the 10th record after its name (older entries keep 9).
// Checked with npm run compare.
@Extractor({
    name: 'mslugx'
})
export default class Mslugx extends AbstractExtractor {
    protected characterNames = ['marco', 'tarma', 'eri', 'fio'];

    extract(): this {
        for (let i = 0; i < 10; i++) {
            const o = i * 8;
            if (o + 7 > this.hi!.buffer.length) {
                break;
            }
            const character = this.hi!.buffer[o + 7];
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 4).toHexNumber(),
                name: this.hi!.slice(o + 4, 3).toString().trim(),
                ...(o + 7 < this.hi!.buffer.length - 2 ? {extra: {character: this.characterNames[character] ?? character}} : {})
            });
        }
        return this;
    }
}
