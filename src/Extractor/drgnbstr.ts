import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// HIGH SCORE: one score, no name. The file holds a 3-byte copy the screen does not use, a marker, the 7
// characters drawn on screen (digits 00 to 09, 2F blank), then a marker byte at the address of the
// third character (hiscore.dat checks it: it is written last, so the screen shows it). Checked on the
// game's screen (MAME 0.289) with modified files: 01 02 03 04 05 06 07 shows 1214567 with the default
// marker 01; 2F 09 08 07 06 05 00 shows 917650.
@Extractor({
    name: 'drgnbstr'
})
export default class Drgnbstr extends AbstractExtractor {
    extract(): this {
        const chars = Array.from(this.hi!.slice(4, 7).buffer);
        chars[2] = this.hi!.buffer[11];
        const digits = chars.filter(c => c <= 9).join('');
        this.output.default.push({rank: 1, score: parseInt(digits || '0', 10), name: ''});
        return this;
    }
}
