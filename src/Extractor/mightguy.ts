import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score, then 8 scores (4 bytes, little-endian hex digits), 00, then 8 names (10 ASCII
// characters; some tiles spell a staff title: PLAN., ART., SOUND., PRG.). Checked against the game's
// BEST 8 screen (MAME 0.289).
@Extractor({
    name: 'mightguy'
})
export default class Mightguy extends AbstractExtractor {
    protected tiles: [number[], string][] = [
        [[0xFD, 0x5B, 0x5C], 'PLAN.'],
        [[0x66, 0x67, 0x6A], 'ART.'],
        [[0xFA, 0xFB, 0xFC, 0x6A], 'SOUND.'],
        [[0x6B, 0x6C], 'PRG.'],
    ];

    protected decodeName(bytes: number[]): string {
        let name = '';
        for (let i = 0; i < bytes.length;) {
            const tile = this.tiles.find(([codes]) => codes.every((c, k) => bytes[i + k] === c));
            if (tile) {
                name += tile[1];
                i += tile[0].length;
            } else {
                name += bytes[i] >= 0x20 && bytes[i] < 0x7F ? String.fromCharCode(bytes[i]) : ' ';
                i++;
            }
        }
        return name.replace(/\s+/g, ' ').trim();
    }

    extract(): this {
        for (let i = 0; i < 8; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 3).reverse().toHexNumber(),
                name: this.decodeName([...this.hi!.slice(37 + i * 10, 10).buffer])
            });
        }
        return this;
    }
}
