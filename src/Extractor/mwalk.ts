import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// The table lives in the work RAM the board keeps on battery (0xfffc00, 10 rows of 8 bytes), which
// mame saves whole as nvram, 16-bit words byte-swapped. hiscore.dat has no entry for mwalk: no .hi.
const TABLE_OFFSET = 0x3c00;
const ROWS = 10;
const ROW_SIZE = 8;

@Extractor({
    name: 'mwalk',
    hi: false,
    nvram: 'nvram'
})
export default class Mwalk extends AbstractExtractor {
    extract(): this {
        const table = this.nvram!.slice(TABLE_OFFSET, ROWS * ROW_SIZE).byteSwap(2);
        for (let i = 0; i < ROWS; i++) {
            this.scores.default.push({
                rank: i + 1,
                score: parseInt(table.slice(i * ROW_SIZE, 4).readIntBE().toString(16)),
                name: table.slice(i * ROW_SIZE + 5, 3).toString()
            });
        }
        return this;
    }
}
