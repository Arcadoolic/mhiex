import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'darwin'
})
export default class Darwin extends AbstractExtractor {
    // BEST3: 3 names, the top score, then 3 scores (4 BCD bytes). A name byte is a tile: ASCII
    // less 0x20 on its low 6 bits (bit 6 only changes the colour), a picture from 0x80 (the
    // default names), given as "?"
    extract(): this {
        for (let i = 0; i < 3; i++) {
            this.output.default.push({
                rank: i + 1,
                score: this.hi!.slice(13 + i * 4, 4).toHexNumber(),
                name: this.hi!.slice(i * 3, 3).byteMap(byte => byte >= 0x80 ? 0x1F : byte & 0x3F).toString({}, 0x20)
            });
        }
        return this;
    }
}
