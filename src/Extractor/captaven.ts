import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: 5 records of 32 bytes: score (4 bytes, little-endian binary), name
// (3 characters of 4 bytes, the first 2 a character code), coins, 11 bytes, character, 3 bytes. Checked
// with npm run compare (attract mode shows no ranking).
@Extractor({
    name: 'captaven'
})
export default class Captaven extends AbstractExtractor {
    protected charset: {[key: number]: string} = {0x0000: ' ', 0xC8B2: '·', 0xDCB2: '¨', 0xE4B2: '¿', 0xE8B2: '!', 0xECB2: '[', 0xF0B2: ']', 0xF4B2: '´', 0xF8B2: '‼', 0xFCB2: '`', 0xC0BE: 'a', 0xC4BE: 'b', 0xC8BE: 'c', 0xCCBE: 'd', 0xD0BE: 'e', 0xD4BE: 'f', 0xD8BE: 'g', 0xDCBE: 'h', 0xE0BE: 'i', 0xE4BE: 'j', 0xE8BE: 'k', 0xECBE: 'l', 0xF0BE: 'm', 0xFCBE: 'n', 0x00BF: 'q', 0x04BF: 'r', 0x08BF: 's', 0x0CBF: 't', 0x10BF: 'u', 0x14BF: 'v', 0x18BF: 'w', 0x1CBF: 'x', 0x20BF: 'y', 0x24BF: 'z', 0x28BF: '●', 0x2CBF: ':', 0x30BF: '.', 0x34BF: ',', 0x38BF: '-', 0x3CBF: '_', 0x40BF: '(', 0x44BF: ')', 0x48BF: '!', 0x4CBF: '?', 0x50BF: '&', 0x58BF: 'A', 0x5CBF: 'B', 0x60BF: 'C', 0x64BF: 'D', 0x68BF: 'E', 0x6CBF: 'F', 0x70BF: 'G', 0x74BF: 'H', 0x78BF: 'I', 0x7CBF: 'J', 0x80BF: 'K', 0x84BF: 'L', 0x88BF: 'M', 0x8CBF: 'N', 0x90BF: 'O', 0x94BF: 'P', 0x98BF: 'Q', 0x9CBF: 'R', 0xA0BF: 'S', 0xA4BF: 'T', 0xA8BF: 'U', 0xACBF: 'V', 0xB0BF: 'W', 0xB4BF: 'X', 0xB8BF: 'Y', 0xBCBF: 'Z', 0xC0BF: '←'};
    protected characterNames = ['captainamerica', 'ironman', 'android', 'hawkeye'];

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const o = i * 32;
            const b = this.hi!.buffer;
            let name = '';
            for (let c = 0; c < 3; c++) {
                name += this.charset[b.readUInt16BE(o + 4 + c * 4)] ?? '';
            }
            this.output.default.push({
                rank: i + 1,
                score: b.readUInt32LE(o),
                name: name.trim(),
                extra: {character: this.characterNames[b[o + 28]] ?? b[o + 28]}
            });
        }
        return this;
    }
}
