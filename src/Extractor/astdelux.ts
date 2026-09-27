import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Only the top 3 scores are saved in the EAROM, the hiscore plugin RAM dump is unreliable
@Extractor({
    name: 'astdelux',
    hi: false,
    nvram: 'earom'
})
export default class Astdelux extends AbstractExtractor {
    protected charset = {
        0x00: ' '
    };

    extract(): this {
        let currentByte = 0;
        for (let i = 0; i < 3; i++) {
            // Entry: score (3 bytes BCD, LSB first), initials (3 bytes, 0x0b = A), checksum
            this.output.default.push({
                rank: i + 1,
                score: this.nvram!.slice(currentByte, 3).reverse().toHexNumber(),
                name: this.nvram!.slice(currentByte + 3, 3).toString(this.charset, 54)
            });
            currentByte += 7;
        }
        return this;
    }
}
