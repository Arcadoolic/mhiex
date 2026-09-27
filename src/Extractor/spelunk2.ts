import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// BEST 10 PLAYERS: 10 records of 10 bytes: score (2 bytes, little-endian hex
// digits, x100), name (8 ASCII characters); then the top score. Checked against the game's screen (MAME 0.289).
@Extractor({
    name: 'spelunk2'
})
export default class Spelunk2 extends AbstractExtractor {
    protected charset: {[key: number]: string} = {};

    extract(): this {
        for (let i = 0; i < 10; i++) {
            const o = i * 10;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(o, 2).reverse().toHexNumber() * 100,
                name: this.hi!.slice(o + 2, 8).toString(this.charset).trim()
            });
        }
        return this;
    }
}
