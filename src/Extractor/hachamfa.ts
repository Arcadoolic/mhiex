import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// THE BEST 10 PLAYERS: rows of 16 bytes, the score in 4 BCD bytes, the stage (16-bit), 4 bytes, then
// 3 ASCII letters on 16-bit words; the screen ranks the first 10 of the 62 rows. Checked on the game's
// screen (MAME 0.289) with a modified file (01 09 87 65, stage 4, ZAQ shows 1098765 4 ZAQ). MAME's
// hiscore.dat range for hachamfa is one byte short (3df instead of 3e0): it never matches, MAUI's
// configuration pack ships the fixed entry.
@Extractor({
    name: 'hachamfa'
})
export default class Hachamfa extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            const row = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row, 4).toHexNumber(),
                name: [11, 13, 15].map(o => String.fromCharCode(this.hi!.buffer[row + o])).join(''),
                extra: {
                    stage: this.hi!.slice(row + 4, 2).buffer.readUInt16BE(0)
                }
            });
        }
        return this;
    }
}
