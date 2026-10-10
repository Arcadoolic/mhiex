import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'gground'
})
export default class Gground extends AbstractExtractor {
    protected charset = {
        0x00: ' ',
    };

    // GREAT GAINERS: 99 records of 8 bytes, score (4 BCD bytes), name (spaces or null bytes until
    // entered) and
    // the stage reached, counted from 0 over rounds of 10 (35 is shown as round 4, stage 6)
    extract(): this {
        for (let i = 0; i < 99; i++) {
            const stage = this.hi!.buffer[i * 8 + 7];
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(i * 8, 4).toHexNumber(),
                name: this.hi!.slice(i * 8 + 4, 3).toString(this.charset).trimEnd(),
                extra: {
                    round: Math.floor(stage / 10) + 1,
                    stage: stage % 10 + 1
                }
            });
        }
        return this;
    }
}
