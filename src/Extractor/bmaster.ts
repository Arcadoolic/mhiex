import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 8 records of 16 bytes: score (4 bytes, little-endian binary, x100), name (3 and a space), player
// (1). The game's SCORE RANKING shows 6 rows: the last 2 slots hold 0 and are left out. Checked
// against that screen (MAME 0.289).
@Extractor({
    name: 'bmaster'
})
export default class Bmaster extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 8; i++) {
            const currentByte = i * 16;
            const score = this.hi!.buffer.readUInt32LE(currentByte) * 100;
            if (score === 0) {
                continue;
            }
            this.output.default.push({
                rank: this.output.default.length + 1,
                score,
                name: this.hi!.slice(currentByte + 6, 3).toString(),
                extra: {
                    player: this.hi!.buffer[currentByte + 10] + 1
                }
            });
        }
        return this;
    }
}
