import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// JALECO RALLY 4WD WINNERS RANK: 50 records of 14 bytes: name (3 ASCII characters, every other byte),
// 2 bytes, score (4 bytes, binary, x100), stage (4 SS1, 5 SR). The game shows the first 15. Needs
// MAUI's corrected hiscore.dat (:maincpu instead of :cpu1). Checked against the game's screen (MAME
// 0.289).
@Extractor({
    name: 'bigrun'
})
export default class Bigrun extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 50; i++) {
            const o = i * 14;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUInt32BE(o + 8) * 100,
                name: this.hi!.slice(o, 6).byteSkip(false).toString().trim()
            });
        }
        return this;
    }
}
