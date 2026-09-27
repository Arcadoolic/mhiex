import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 25 records of 22 bytes: score (4 bytes, hex digits), name (8 characters of 2 bytes: ASCII + 0xA0,
// B1DE and B1DF are the heroines' faces), scene (2 bytes). Checked against the game's ranking screens
// (MAME 0.289).
@Extractor({
    name: 'rodland'
})
export default class Rodland extends AbstractExtractor {
    protected faces: {[code: number]: string} = {0xB1DE: '☺', 0xB1DF: '☺'};

    extract(): this {
        for (let i = 0; i < 25; i++) {
            const o = i * 22;
            let name = '';
            for (let c = 0; c < 8; c++) {
                const code = this.hi!.buffer.readUInt16BE(o + 4 + c * 2);
                name += this.faces[code] ?? (code >= 0xA0 && code < 0x120 ? String.fromCharCode(code - 0xA0) : ' ');
            }
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 4).toHexNumber(),
                name: name.trim(),
                extra: {scene: this.hi!.buffer.readUInt16BE(o + 20)}
            });
        }
        return this;
    }
}
