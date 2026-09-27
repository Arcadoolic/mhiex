import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (124 bytes), checked with npm run compare.
@Extractor({
    name: 'strider'
})
export default class Strider extends AbstractExtractor {
    protected charset = {
        0x00: '0',
        0x01: '1',
        0x02: '2',
        0x03: '3',
        0x04: '4',
        0x05: '5',
        0x06: '6',
        0x07: '7',
        0x08: '8',
        0x09: '9',
        0x22: '&black-star;',
        0x23: '&lama;',
        0x24: '&cat-face;',
        0x25: '&hot-beverage;',
        0x26: '&car-side;',
        0x2B: '.',
        0x2F: '&mens-symbol;',
        0x5A: '&black-spade;',
        0x5B: '&black-diamond;',
        0x5C: '&black-heart;',
        0x5D: '&black-club;',
        0x5E: ' ',
    };

    extract(): this {
        for (let i = 0; i < 10; i++) {
            this.output.default.push({
                rank: i + 1,
                score: parseInt(this.hi!.slice(40 + i * 8, 4).hexDigits()),
                name: this.hi!.slice(44 + i * 8, 4).toString(this.charset)
            });
        }
        return this;
    }
}
