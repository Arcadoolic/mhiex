import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The name tiles, read down the 4 columns of the game's entry grid: tile 0x20 + 4 * row + column
const LETTERS = 'ABCDEFG HIJKLMN OPQRSTU VWXYZ←';

@Extractor({
    name: 'wardner'
})
export default class Wardner extends AbstractExtractor {
    // The top score, 10 scores (3 BCD bytes, tens dropped), 10 names (5 tiles, 0x3C for a blank),
    // 10 areas (counted from 0)
    extract(): this {
        for (let i = 0; i < 10; i++) {
            let name = '';
            for (const tile of this.hi!.slice(33 + i * 5, 5).buffer) {
                name += LETTERS[(tile & 3) * 8 + ((tile - 0x20) >> 2)] ?? ' ';
            }
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(3 + i * 3, 3).toHexNumber() * 10,
                name: name.trimEnd(),
                extra: {
                    area: this.hi!.buffer[83 + i] + 1
                }
            });
        }
        return this;
    }
}
