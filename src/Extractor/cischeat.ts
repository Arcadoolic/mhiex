import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// RANKING: 17 scores (4 bytes, binary, x10), then from byte 512 the 17 names (3 ASCII characters, 00).
// Needs MAUI's corrected hiscore.dat (:maincpu instead of :cpu1). Checked against the game's screen
// (MAME 0.289).
@Extractor({
    name: 'cischeat'
})
export default class Cischeat extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 17; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUInt32BE(i * 4) * 10,
                name: this.hi!.slice(512 + i * 4, 3).toString().trim()
            });
        }
        return this;
    }
}
