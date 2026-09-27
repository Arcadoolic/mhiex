import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score, then 10 scores: 4 bytes each, the first 3 as hex digits. From byte 52, 10 name
// records of 8 bytes: 3 bytes, name (3 ASCII characters), FF 00 (cut from the 10th record by the MAME
// 0.289 hiscore.dat entry). Checked against the game's screen (MAME 0.289), and with a modified file
// loaded by the hiscore plugin (01 02 03 shows 10203).
@Extractor({
    name: 'wiping'
})
export default class Wiping extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(4 + i * 4, 3).toHexNumber(),
                name: this.hi!.slice(52 + i * 8 + 3, 3).toString().trim()
            });
        }
        return this;
    }
}
