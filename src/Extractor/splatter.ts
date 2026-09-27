import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 8: 8 records of 8 bytes: score (3 bytes, hex digits, x100), stage, name (3 ASCII characters),
// space (cut from the 8th record by the MAME 0.289 hiscore.dat entry). Checked against the game's
// screen (MAME 0.289).
@Extractor({
    name: 'splatter'
})
export default class Splatter extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 8; i++) {
            const o = i * 8;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 3).toHexNumber() * 100,
                name: this.hi!.slice(o + 4, 3).toString().trim(),
                extra: {stage: this.hi!.buffer[o + 3]}
            });
        }
        return this;
    }
}
