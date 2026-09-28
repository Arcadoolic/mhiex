import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST PLAYERS: 10 records of 16 bytes: score (4 bytes, hex digits, x100), name (7 characters: A = 0,
// 0x1B '!', 0x2D blank), stage (hex digits), padding. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'riskchal'
})
export default class Riskchal extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 10; i++) {
            const o = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 4).toHexNumber() * 100,
                name: this.hi!.slice(o + 4, 7).toString({0x1B: '!', 0x2D: ' '}, 0x41).trim(),
                extra: {stage: this.hi!.slice(o + 11, 1).toHexNumber()}
            });
        }
        return this;
    }
}
