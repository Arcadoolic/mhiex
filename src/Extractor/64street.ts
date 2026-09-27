import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 10 records of 12 bytes: character (1), score (4 bytes, hex digits), name (3), padding (4).
// Checked with MAME 0.289: the HUD shows the default top scores, RICK 500000 and ALLEN 450000; the
// demo shows no ranking, so the names are not checked on screen.
@Extractor({
    name: '64street'
})
export default class Extractor64street extends AbstractExtractor {
    protected characterNames: {[key: number]: string} = {
        0x00: 'rick',
        0x01: 'allen',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            const currentByte = i * 12;
            const character = this.hi!.buffer[currentByte];
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(currentByte + 1, 4).toHexNumber(),
                name: this.hi!.slice(currentByte + 5, 3).toString(),
                extra: {
                    character: this.characterNames[character] ?? character
                }
            });
        }
        return this;
    }
}
