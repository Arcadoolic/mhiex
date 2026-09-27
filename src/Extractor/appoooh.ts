import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'appoooh'
})
export default class Appoooh extends AbstractExtractor {
    protected charset = {
        0x00: ' ',
        0x3F: ' ',
        0x40: ' ',
    };

    extract(): this {
        let currentByte = 10;
        // 20 records: hiscore.dat saves 0xdc bytes after the top score, the 21st one is not in the file
        for (let i = 0; i < 20; i++) {
            this.output.default.push({
                rank: i + 1,
                name: this.hi!.slice(currentByte, 3).toString(this.charset),
                score: this.hi!.slice(currentByte + 3, 6).decodeBCD()
            });
            currentByte += 11;
        }
        return this;
    }
}
