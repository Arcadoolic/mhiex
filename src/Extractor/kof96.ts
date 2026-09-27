import Kof94 from "./kof94";
import Extractor from "../Decorator/Extractor";

// kof94's saveram table from byte 808, 12-byte records (the team's 3 characters follow the name). Checked with npm run compare.
@Extractor({
    name: 'kof96',
    hi: false,
    nvram: 'saveram'
})
export default class Kof96 extends Kof94 {
    protected tableOffset = 808;
    protected recordSize = 12;
}
