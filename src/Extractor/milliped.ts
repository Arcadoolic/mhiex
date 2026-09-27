import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition: ranks 1-3 are kept in the earom, ranks 4-8 in the .hi file, which
// the hiscore plugin only writes once a default score is beaten (hence optional).
@Extractor({
    name: 'milliped',
    hi: 'optional',
    nvram: 'earom'
})
export default class Milliped extends AbstractExtractor {
    protected charset = {
        0x00: ' ',
    };

    extract(): this {
        // earom: 3 scores (3 bytes, little-endian hex digits), then 3 names. A factory earom is
        // blank (FF) until a game has been played: no ranks 1-3 then.
        for (let i = 0; i < 3; i++) {
            if (!/^\d+$/.test(this.nvram!.slice(i * 3, 3).hexDigits())) {
                continue;
            }
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.nvram!.slice(i * 3, 3).reverse().hexDigits()),
                name: this.nvram!.slice(9 + i * 3, 3).toString(this.charset, 64)
            });
        }
        if (this.hi) {
            // .hi: 5 names, then 5 scores
            for (let i = 0; i < 5; i++) {
                this.output.default.push({
                    rank: i + 4,
                    score: parseInt(this.hi.slice(15 + i * 3, 3).reverse().hexDigits()),
                    name: this.hi.slice(i * 3, 3).toString(this.charset, 64)
                });
            }
        }
        return this;
    }
}
