import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The game shows 16 entries but only saves its 6 best, in its EEPROM at 0x1e0: per entry, the score
// as 3 bytes of BCD, then the initials packed in 15 bits, 5 per letter (A = 0), unsorted (the game
// ranks them). A blank EEPROM holds TET/RIS 10000 to 7500. Ranks 1-6 come from it: the hiscore
// plugin's .hi of the RAM table can be days behind (it stopped being written on a cabinet once a
// score was made).
// Ranks 7-16 only live in RAM, until the machine is turned off: they come from the .hi, the RAM
// table at 0x979 (16 scores as 6 ASCII digits, then 16 names of 3 characters), when its ranks 1-6
// are the EEPROM's (else it is behind, and so are its ranks 7-16). MAUI's corrected hiscore.dat
// saves all of it (0x90 bytes); MAME 0.289's entry (99d, 0x6c bytes) starts 36 bytes in, at rank
// 7's score: only the names of ranks 1-6 can be compared then. Checked against the game's HIGH
// SCORES screen (MAME 0.289).
@Extractor({
    name: 'atetris',
    hi: 'optional',
    nvram: 'eeprom'
})
export default class Atetris extends AbstractExtractor {
    extract(): this {
        const best = [];
        for (let offset = 0x1e0; offset + 5 <= 0x1fe; offset += 5) {
            const initials = this.nvram!.buffer.readUInt16BE(offset + 3);
            best.push({
                score: this.nvram!.slice(offset, 3).toHexNumber(),
                name: [10, 5, 0].map(shift => Atetris.letter((initials >> shift) & 31)).join('')
            });
        }
        best.sort((a, b) => b.score - a.score)
            .forEach((entry, index) => this.output.default.push({rank: index + 1, ...entry}));

        if (this.hi) {
            // 36 bytes are missing from the start of the 0x6c-byte file
            const shift = this.hi.buffer.length >= 0x90 ? 0 : 36;
            const ram = (rank: number) => ({
                score: rank * 6 - 6 >= shift ? parseInt(this.hi!.slice((rank - 1) * 6 - shift, 6).toString()) : null,
                name: this.hi!.slice(96 + (rank - 1) * 3 - shift, 3).toString(),
            });
            const sameTop = this.output.default.every(({rank, score, name}) => {
                const row = ram(rank);
                return row.name === name && (row.score === null || row.score === score);
            });
            if (!sameTop) {
                return this;
            }
            for (let rank = 7; rank <= 16; rank++) {
                const {score, name} = ram(rank);
                this.output.default.push({rank, score: score!, name});
            }
        }
        return this;
    }

    private static letter(value: number): string {
        return value < 26 ? String.fromCharCode(65 + value) : ' ';
    }
}
