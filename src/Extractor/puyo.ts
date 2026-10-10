import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'puyo'
})
export default class Puyo extends AbstractExtractor {
    // Letters from 0x01 in puyo, plain ASCII in puyopuy2
    protected nameOffset = 0x40;

    // BEST RECORD: 5 records of 16 bytes, name (3 characters, then 3 bytes 0xFF), score (4 bytes,
    // binary), blocks (2 bytes, binary), 4 bytes
    extract(): this {
        for (let i = 0; i < 5; i++) {
            const currentByte = i * 16;
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.buffer.readUInt32BE(currentByte + 6),
                name: this.hi!.slice(currentByte, 3).toString({}, this.nameOffset),
                extra: {
                    blocks: this.hi!.buffer.readUInt16BE(currentByte + 10)
                }
            });
        }
        return this;
    }
}
