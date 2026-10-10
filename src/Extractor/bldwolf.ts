import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'bldwolf'
})
export default class Bldwolf extends AbstractExtractor {
    protected charset = {
        0xB2: '*', // a medal
    };

    // BEST 10 PLAYERS: 10 names (3 characters and a space) at 0x00, 10 scores (4 BCD bytes) at
    // 0x40, 10 stages (counted from 0; the 8th is shown as a medal) at 0x80, then the top score
    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(0x40 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(i * 4, 3).toString(this.charset),
                extra: {
                    stage: this.hi!.buffer[0x80 + i] + 1
                }
            });
        }
        return this;
    }
}
