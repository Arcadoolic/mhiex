import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// ACE PILOTS (SOLO PLAYERS): 10 records of 10 bytes: score (4 bytes, little-endian binary), stage (2
// bytes), name (3 ASCII characters), 00. A second table of 10 records follows (not shown in attract
// mode, left out). Checked against the game's screen (MAME 0.289, on a second boot: the first one
// updates the nvram).
@Extractor({
    name: 'viprp1'
})
export default class Viprp1 extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            const o = i * 10;
            const b = this.hi!.buffer;
            this.output.default.push({
                rank: i + 1,
                score: b.readUInt32LE(o),
                name: this.hi!.slice(o + 6, 3).toString().trim(),
                extra: {stage: `${b[o + 4]}-${b[o + 5]}`}
            });
        }
        return this;
    }
}
