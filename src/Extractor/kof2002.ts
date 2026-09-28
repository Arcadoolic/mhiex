import Kof94 from "./kof94";
import Extractor from "../Decorator/Extractor";

// Same saveram table as kof2001. Checked with npm run compare.
@Extractor({
    name: 'kof2002',
    hi: false,
    nvram: 'saveram'
})
export default class Kof2002 extends Kof94 {
    protected recordSize = 12;
}
