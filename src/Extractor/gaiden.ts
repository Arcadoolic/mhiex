import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// A linked list saved from 0x62e34: the first word points to the best record, each record (16 bytes)
// starts with a pointer to the next one (0 ends the list), then 2 bytes, the score (+4, 6 bytes, one
// digit each) and the name (+10, 6 ASCII characters, '\' shows '.'). Checked against the game's BEST
// of Ninja screen (MAME 0.289), and with a modified file loaded by the hiscore plugin.
@Extractor({
    name: 'gaiden'
})
export default class Gaiden extends AbstractExtractor {
    protected base = 0x2e34;

    extract(): this {
        let pointer = this.hi!.slice(0, 2).buffer.readUInt16BE(0);
        for (let rank = 1; rank <= 10 && pointer; rank++) {
            const offset = pointer - this.base;
            if (offset < 16 || offset + 16 > 208) {
                break;
            }
            this.output.default.push({
                rank,
                score: parseInt(this.hi!.slice(offset + 4, 6).hexDigits('odd')),
                name: this.hi!.slice(offset + 10, 6).toString({0x5C: '.'}).trim()
            });
            pointer = this.hi!.slice(offset, 2).buffer.readUInt16BE(0);
        }
        return this;
    }
}
