import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Winning streaks table in nvram (hi2txt: mk2 is "sameas mk"). mk itself has no extractor: the
// game clears the streak before checking the table, so a played score never reaches it.
@Extractor({
    name: 'mk2',
    hi: false,
    nvram: 'nvram'
})
export default class Mk2 extends AbstractExtractor {
    extract(): this {
        let currentByte = 6144; // Skip first 6144 bytes
        for (let i = 0; i < 15; i++) {
            this.scores.default.push({
                rank: i + 1,
                name: this.nvram!.slice(currentByte, 6).byteSkip(true).toString({}, 65),
                score: this.nvram!.slice(currentByte + 10, 8).byteSkip(true).readIntLE()
            });
            currentByte += 18;
        }
        return this;
    }
}
