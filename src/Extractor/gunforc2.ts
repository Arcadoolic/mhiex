import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 5 records of 16 bytes: score (4 bytes, little-endian hex digits),
// grade, rank, name (4 characters of 2 bytes), 2 bytes (cut from the 5th record by the MAME 0.289
// hiscore.dat entry). Checked with npm run compare.
@Extractor({
    name: 'gunforc2'
})
export default class Gunforc2 extends AbstractExtractor {
    protected charset: {[key: number]: string} = {0x0000: '', 0x0600: '', 0x0003: 'A', 0x0203: 'B', 0x0403: 'C', 0x0603: 'D', 0x0803: 'E', 0x0A03: 'F', 0x0C03: 'G', 0x0E03: 'H', 0x2003: 'I', 0x2203: 'J', 0x2403: 'K', 0x2603: 'L', 0x2803: 'M', 0x2A03: 'N', 0x2C03: 'O', 0x2E03: 'P', 0x4003: 'Q', 0x4203: 'R', 0x4403: 'S', 0x4603: 'T', 0x4803: 'U', 0x4A03: 'V', 0x4C03: 'W', 0x4E03: 'X', 0x6003: 'Y', 0x6203: 'Z', 0x6403: '0', 0x6603: '1', 0x6803: '2', 0x6A03: '3', 0x6C03: '4', 0x6E03: '5', 0x8003: '6', 0x8203: '7', 0x8403: '8', 0x8603: '9', 0xA203: '.', 0xA603: '!', 0xAA03: '?', 0xC403: '-', 0xC603: '&', 0xC803: '♡', 0xCA03: '·', 0xCE03: 'Jr.', 0xE803: 'Ⅰ', 0xEA03: 'Ⅱ', 0xEC03: 'Ⅲ', 0xEE03: 'Ⅳ'};
    protected grades = ['', 'private', 'sergent', 'captain', 'major', 'colonel', 'general', 'marshal'];

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const o = i * 16;
            const b = this.hi!.buffer;
            let name = '';
            for (let c = 0; c < 4 && o + 7 + c * 2 < b.length; c++) {
                name += this.charset[b.readUInt16BE(o + 6 + c * 2)] ?? '';
            }
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 4).reverse().toHexNumber(),
                name: name.trim(),
                extra: {grade: this.grades[b[o + 4]] || 'private'}
            });
        }
        return this;
    }
}
