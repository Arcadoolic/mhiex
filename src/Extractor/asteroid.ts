import AbstractExtractor from '../AbstractExtractor';
import Extractor from '../Decorator/Extractor';

@Extractor({
    name: 'asteroid',
    hi: true
})
// Reads the first 53 bytes: files from before hiscore.dat added its 1-byte range at 0x4030 (54
// bytes since) are the same layout.
export default class Asteroid extends AbstractExtractor {
    protected charset = {
        0x00: ' ',
    };

    extract(): this {
        let currentBytes = 0;
        for (let i = 0; i < 10; i++) {
            this.scores.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.buffer.readIntLE(currentBytes, 2).toString(16)) * 10,
                name: '',
            });
            currentBytes += 2;
        }
        currentBytes += 3; //Separator
        for (let i = 0; i < 10; i++) {
            this.scores.default[i].name = this.hi!.slice(currentBytes, 3).toString(this.charset, 54);
            currentBytes += 3;
        }
        return this;
    }
}
