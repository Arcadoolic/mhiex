import Kof94 from "./kof94";
import Extractor from "../Decorator/Extractor";

// kof94's saveram table from byte 808, 12-byte records: score (2 bytes), rank, 1 byte, name. Checked with npm run compare.
@Extractor({
    name: 'kof99',
    hi: false,
    nvram: 'saveram'
})
export default class Kof99 extends Kof94 {
    protected tableOffset = 808;
    protected recordSize = 12;
    protected scoreSize = 2;
    protected nameAt = 4;
}
