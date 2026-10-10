import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

@Extractor({
    name: 'eswat'
})
export default class Eswat extends AbstractExtractor {
    // SUPER COPS LIST: 7 records of 10 bytes, score (4 BCD bytes), name (4 characters) and the stage
    // reached (2 bytes shown as "1-2"; 0 for a default row, shown as "-")
    extract(): this {
        for (let i = 0; i < 7; i++) {
            const currentByte = i * 10;
            const row: Score = {
                rank: i + 1,
                score: this.hi!.slice(currentByte, 4).toHexNumber(),
                name: this.hi!.slice(currentByte + 4, 4).toString().trimEnd()
            };
            const stage = this.hi!.buffer[currentByte + 8];
            if (stage) {
                row.extra = {stage: `${stage}-${this.hi!.buffer[currentByte + 9]}`};
            }
            this.output.default.push(row);
        }
        return this;
    }
}
