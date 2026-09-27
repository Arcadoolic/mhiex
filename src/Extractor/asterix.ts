import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'asterix'
})
export default class Asterix extends AbstractExtractor {
    protected charset = {
        0x0A: ',',
        0x0C: '.',
        0x0D: '!',
        0x0E: '?',
        0x0F: '-',
        0x10: ' ',
    };

    protected characterNames: {[key: number]: string} = {
        0x01: 'asterix',
        0x02: 'obelix',
    };

    extract(): this {
        let currentByte = 0;
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                name: this.hi!.slice(currentByte + 4, 3).toString(this.charset, 48),
                score: this.hi!.slice(currentByte, 4).toHexNumber(),
                extra: {
                    character: this.characterNames[this.hi!.buffer[currentByte + 7]] ?? this.hi!.buffer[currentByte + 7]
                }
            });
            currentByte += 8;
        }
        return this;
    }
}
