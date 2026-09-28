import Kof94 from "./kof94";
import Extractor from "../Decorator/Extractor";

// kof94's saveram layout: 10 records of 8 bytes from byte 846. Checked with npm run compare.
@Extractor({
    name: 'mslug3',
    hi: false,
    nvram: 'saveram'
})
export default class Mslug3 extends Kof94 {
    protected tableOffset = 846;
    protected count = 10;
}
