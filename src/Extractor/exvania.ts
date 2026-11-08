import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Order / Name / Win Ratio: 5 rows of 8 bytes, the name on 4 ASCII characters, then the win ratio as a
// 32-bit number (the score). The table shows about 3 minutes into attract mode. Checked on the game's
// screen (MAME 0.289) with a modified file ("ZAQ " 00 00 00 63 shows ZAQ 99).
@Extractor({
    name: 'exvania'
})
export default class Exvania extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8 + 4, 4).buffer.readUInt32BE(0),
                name: this.hi!.slice(i * 8, 4).toString().trimEnd()
            });
        }
        return this;
    }
}
