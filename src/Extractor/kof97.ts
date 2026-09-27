import Kof94 from "./kof94";
import Extractor from "../Decorator/Extractor";

// Same saveram table as kof96. Checked with npm run compare.
@Extractor({
    name: 'kof97',
    hi: false,
    nvram: 'saveram'
})
export default class Kof97 extends Kof94 {
    protected tableOffset = 808;
    protected recordSize = 12;
}
