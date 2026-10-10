import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";
import {Score} from "../interfaces";

@Extractor({
    name: 'enduror'
})
export default class Enduror extends AbstractExtractor {
    // BEST 7 SCORES: records of 12 bytes, score (4 BCD bytes), name (4 characters) and the race
    // time (4 BCD bytes: minutes on 2, seconds, hundredths; 0 for a default row, shown blank)
    extract(): this {
        for (let i = 0; i < 7; i++) {
            const currentByte = i * 12;
            const row: Score = {
                rank: i + 1,
                score: this.hi!.slice(currentByte, 4).toHexNumber(),
                name: this.hi!.slice(currentByte + 4, 4).toString().trimEnd()
            };
            const time = this.hi!.slice(currentByte + 8, 4).hexDigits();
            if (parseInt(time)) {
                row.extra = {time: `${parseInt(time.slice(0, 4))}'${time.slice(4, 6)}"${time.slice(6)}`};
            }
            this.output.default.push(row);
        }
        return this;
    }
}
