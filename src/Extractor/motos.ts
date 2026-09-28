import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// 5 records of 32 bytes, all ASCII: rank (4), score (8), round (4), name (12), then 4 zeros. Checked
// against the game's THE TOP-RANKERS screen (MAME 0.289).
@Extractor({
    name: 'motos'
})
export default class Motos extends AbstractExtractor {
    extract(): this {
        for (let i = 0; i < 5; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(i * 32 + 4, 8).toString()),
                name: this.hi!.slice(i * 32 + 16, 12).toString().trim(),
                extra: {round: parseInt(this.hi!.slice(i * 32 + 12, 4).toString())}
            });
        }
        return this;
    }
}
