import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING: 18 records of 10 bytes: 09, time (3 bytes, little-endian binary, 1/100 s), 00, character,
// name (3 ASCII characters), 00 (cut from the 18th record by the MAME 0.289 hiscore.dat entry). The
// best time ranks first (score in seconds). Checked against the game's screens (MAME 0.289).
@Extractor({
    name: 'vf'
})
export default class Vf extends AbstractExtractor {
    protected characterNames: {[key: number]: string} = {
        0x00: 'lau', 0x01: 'jacky', 0x02: 'kage', 0x04: 'wolf', 0x06: 'sarah', 0x07: 'pai', 0x08: 'jeffry',
        0x0B: 'akira',
    };

    extract(): this {
        for (let i = 0; i < 18; i++) {
            const o = i * 10;
            const b = this.hi!.buffer;
            this.output.default.push({
                rank: i + 1,
                score: b.readUIntLE(o + 1, 3) / 100,
                scoreSuffix: 'sec',
                name: this.hi!.slice(o + 6, 3).toString().trim(),
                extra: {character: this.characterNames[b[o + 5]] ?? b[o + 5]}
            });
        }
        return this;
    }
}
