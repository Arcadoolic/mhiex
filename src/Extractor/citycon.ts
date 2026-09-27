import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The top score (4 bytes, hex digits) and top distance (2), then two tables of 10 records of 12
// bytes: name (8), a 25 00 separator, value (2 bytes, hex digits). TOP 10 RUNNER (km) first, then
// TOP 10 POINTER (points, x100). Both checked against the game's screens (MAME 0.289).
@Extractor({
    name: 'citycon'
})
export default class Citycon extends AbstractExtractor {
    extract(): this {
        this.output.extras = {runner: []};
        for (let i = 0; i < 10; i++) {
            const runner = 6 + i * 12;
            this.output.extras.runner.push({
                rank: i + 1,
                score: this.hi!.slice(runner + 10, 2).toHexNumber(),
                name: this.hi!.slice(runner, 8).toString().trim(),
                scoreSuffix: 'km'
            });
            const pointer = 126 + i * 12;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(pointer + 10, 2).toHexNumber() * 100,
                name: this.hi!.slice(pointer, 8).toString().trim()
            });
        }
        return this;
    }
}
