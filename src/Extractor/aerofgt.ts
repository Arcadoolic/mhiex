import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'aerofgt'
})
export default class Aerofgt extends AbstractExtractor {
    protected charset = {
        0x00: '',
        // 0x01-0x0A are the digits, letters start at 0x0B (+54 = 'A')
        0x01: '0', 0x02: '1', 0x03: '2', 0x04: '3', 0x05: '4',
        0x06: '5', 0x07: '6', 0x08: '7', 0x09: '8', 0x0A: '9',
        0x25: '.',
        0x26: '-',
    };

    extract(): this {
        let currentByte = 0;
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                name: this.hi!.slice(currentByte, 3).toString(this.charset, 54),
                score: this.hi!.slice(currentByte + 4, 3).readIntBE() * 100
            });
            currentByte += 16;
        }
        return this;
    }
}
