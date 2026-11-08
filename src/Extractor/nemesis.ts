import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// A marker byte, then 10 rows of 14 bytes: 00, the player's sign (the zodiac symbol drawn after the
// score), the initials ("H.M": 0x01 is A, 0x1C the dot) on 8 bytes of which the screen shows 3, 00,
// then the score in 3 BCD bytes; the screen ranks 5 per page. Checked on the game's screen (MAME 0.289)
// with a modified file (98 76 50 shows 987650, Z.Q; 01 23 45 B.C second).
@Extractor({
    name: 'nemesis'
})
export default class Nemesis extends AbstractExtractor {
    protected charset = {
        0x1C: '.',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            const row = 1 + i * 14;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(row + 11, 3).toHexNumber(),
                name: this.hi!.slice(row + 2, 3).toString(this.charset, 0x40),
                extra: {
                    sign: this.hi!.slice(row + 1, 1).readIntBE()
                }
            });
        }
        return this;
    }
}
