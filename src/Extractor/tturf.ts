import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'tturf'
})
export default class Tturf extends AbstractExtractor {
    // Tiles: blank 0x00, digits from 0x08, letters from 0x12
    protected charset = {
        0x00: ' ',
        0x08: '0', 0x09: '1', 0x0A: '2', 0x0B: '3', 0x0C: '4',
        0x0D: '5', 0x0E: '6', 0x0F: '7', 0x10: '8', 0x11: '9',
        0x2C: '&',
        0x2D: '!',
        0x2E: '?',
        0x2F: '.',
        0x30: ' ',
        0x31: '←',
    };

    // 8 records of 16 bytes, all tiles as shown: score (7), stage (1) and name (8)
    extract(): this {
        for (let i = 0; i < 8; i++) {
            const currentByte = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(currentByte, 7).toString(this.charset, 0x2F)),
                name: this.hi!.slice(currentByte + 8, 8).toString(this.charset, 0x2F).trimEnd(),
                extra: {
                    stage: parseInt(this.hi!.slice(currentByte + 7, 1).toString(this.charset, 0x2F))
                }
            });
        }
        return this;
    }
}
