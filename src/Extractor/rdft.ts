import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// ACE PILOTS (SOLO PLAY): 7 records of 10 bytes: score (4 bytes, little-endian binary), stage (2
// bytes: area, round), rank - 1, name (3 ASCII characters). Two more tables of 5 records follow (not
// shown in attract mode, left out). Checked against the game's screen (MAME 0.289, on a second boot:
// the first one updates the nvram).
@Extractor({
    name: 'rdft'
})
export default class Rdft extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 7; i++) {
            const o = i * 10;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUInt32LE(o),
                name: this.hi!.slice(o + 7, 3).toString().trim(),
                extra: {stage: `${this.hi!.buffer[o + 4]}-${this.hi!.buffer[o + 5]}`}
            });
        }
        return this;
    }
}
