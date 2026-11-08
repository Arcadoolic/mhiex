import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 10 PLAYERS: 10 names of 4 bytes (3 ASCII letters and a space) from byte 0, 10 scores in 4 BCD
// bytes from byte 0x40, then 10 stage bytes from 0x80 (00 is STAGE 1). Checked on the game's screen
// (MAME 0.289) with a modified file ("ZAQ " 01 23 45 67, stage 04 shows ZAQ 1234567 STAGE 5).
@Extractor({
    name: 'battlera'
})
export default class Battlera extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(0x40 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(i * 4, 3).toString(),
                extra: {
                    stage: this.hi!.buffer[0x80 + i] + 1
                }
            });
        }
        return this;
    }
}
