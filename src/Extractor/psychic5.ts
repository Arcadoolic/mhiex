import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 7 PLAYERS: 7 records of 7 bytes: score (3 bytes, hex digits, x100), name (3 ASCII characters,
// 0x5C '♠', 0x5E '♥'), scene (cut from the 7th record by the MAME 0.289 hiscore.dat entry); then the
// top score. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'psychic5'
})
export default class Psychic5 extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 7; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 7, 3).toHexNumber() * 100,
                name: this.hi!.slice(i * 7 + 3, 3).toString({0x5C: '♠', 0x5E: '♥'}).trim()
            });
        }
        return this;
    }
}
