import Kof94 from "./kof94";
import Extractor from "../Decorator/Extractor";

// Same saveram table as kof99. Checked with npm run compare.
@Extractor({
    name: 'kof2000',
    hi: false,
    nvram: 'saveram'
})
export default class Kof2000 extends Kof94 {
    protected tableOffset = 808;
    protected recordSize = 12;
    protected scoreSize = 2;
    protected nameAt = 4;
}
