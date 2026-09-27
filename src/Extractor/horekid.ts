import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 scores (4 bytes, hex digits), 5 names (3 characters, A = 0x91), 5 rounds (hex digits). Checked
// against the game's BEST 5 screen (MAME 0.289, after 150 s of attract mode), and with names set to
// 0x91-0xAE in files loaded by the hiscore plugin.
@Extractor({
    name: 'horekid'
})
export default class Horekid extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 4, 4).toHexNumber(),
                name: this.hi!.slice(20 + i * 3, 3).toString({}, -0x50).trim(),
                extra: {round: this.hi!.slice(35 + i, 1).toHexNumber()}
            });
        }
        return this;
    }
}
