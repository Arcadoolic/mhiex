import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The game keeps 16 entries at 0x979: scores as 6 ASCII digits, then 16 names of 3 characters. MAME
// 0.289's hiscore.dat entry (99d, 0x6c bytes) starts 36 bytes into the table, leaving out the scores of
// ranks 1-6: MAUI's corrected hiscore.dat saves the whole table (979, 0x90 bytes). Both files are
// read. Checked against the game's HIGH SCORES screen (MAME 0.289).
@Extractor({
    name: 'atetris'
})
export default class Atetris extends AbstractExtractor {
    extract(): this {
        // 36 bytes are missing from the start of the 0x6c-byte file
        const shift = this.hi!.buffer.length >= 0x90 ? 0 : 36;
        for (let rank = shift ? 7 : 1; rank <= 16; rank++) {
            this.output.default.push({
                rank,
                score: parseInt(this.hi!.slice((rank - 1) * 6 - shift, 6).toString()),
                name: this.hi!.slice(96 + (rank - 1) * 3 - shift, 3).toString()
            });
        }
        return this;
    }
}
