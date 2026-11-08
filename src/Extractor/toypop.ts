import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// TODAY'S TOPS: 5 rows of 16 bytes, the score as 7 digits (one per byte), 4 bytes for the BOX column,
// then the name on 5 characters in ASCII (F9 is the heart of the default names); the top score follows.
// Checked on the game's screen (MAME 0.289) with a modified file (00 09 08 07 06 05 00 and ZAQ F9 shows
// 987650 ZAQ and a heart).
@Extractor({
    name: 'toypop'
})
export default class Toypop extends AbstractExtractor {
    protected charset = {
        0xF9: '♥',
    };

    extract(): this {
        for (let i = 0; i < 5; i++) {
            const row = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: parseInt(Array.from(this.hi!.slice(row, 7).buffer).join(''), 10),
                name: this.hi!.slice(row + 11, 5).toString(this.charset).trimEnd()
            });
        }
        return this;
    }
}
