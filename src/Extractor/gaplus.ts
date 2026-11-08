import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TOP 5 PLAYERS. After 8 bytes (the top score's digits, least significant first), 5 rows of 16 bytes
// whose first 8 are the score in ASCII, right-aligned; then 5 rows of 16 bytes: the name (8 ASCII
// characters), the age (4) and the blood group (2). Checked on the game's screen (MAME 0.289) with a
// modified file ("  987650" and "ZAQ" "99" "AB" show 987650 ZAQ 99 AB).
@Extractor({
    name: 'gaplus'
})
export default class Gaplus extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const row = 0x58 + i * 16;
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(8 + i * 16, 8).toString().trim() || '0', 10),
                name: this.hi!.slice(row, 8).toString().trimEnd(),
                extra: {
                    age: this.hi!.slice(row + 8, 4).toString().trim(),
                    blood: this.hi!.slice(row + 12, 2).toString().trim()
                }
            });
        }
        return this;
    }
}
