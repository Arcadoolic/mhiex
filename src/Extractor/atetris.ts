import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The game keeps its 6 best scores in its EEPROM, at 0x1e0: per entry, the score as 3 bytes of BCD,
// then the initials packed in 15 bits, 5 per letter (A = 0). Unsorted: the game ranks them. Its
// HIGH SCORES screen shows them as ranks 1-6, then 10 entries of the ROM's own (KFT 7000 to LVR
// 2500), which are never saved and are left out here. A blank EEPROM holds TET/RIS 10000 to 7500.
// The RAM table the hiscore plugin saves (0x979) is not read: the game loads it from the EEPROM at
// boot, and the plugin stopped writing it once a score had been made (a cabinet's .hi stayed 2 days
// behind its EEPROM). Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'atetris',
    hi: false,
    nvram: 'eeprom'
})
export default class Atetris extends AbstractExtractor {
    extract(): this {
        const entries = [];
        for (let offset = 0x1e0; offset + 5 <= 0x1fe; offset += 5) {
            const initials = this.nvram!.buffer.readUInt16BE(offset + 3);
            entries.push({
                score: this.nvram!.slice(offset, 3).toHexNumber(),
                name: [10, 5, 0].map(shift => Atetris.letter((initials >> shift) & 31)).join('')
            });
        }
        entries.sort((a, b) => b.score - a.score)
            .forEach((entry, index) => this.output.default.push({rank: index + 1, ...entry}));
        return this;
    }

    private static letter(value: number): string {
        return value < 26 ? String.fromCharCode(65 + value) : ' ';
    }
}
