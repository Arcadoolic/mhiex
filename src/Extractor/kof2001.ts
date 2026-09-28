import Kof94 from "./kof94";
import Extractor from "../Decorator/Extractor";

// kof94's saveram table with 12-byte records (the team's 4 characters follow the name). Checked with npm run compare.
@Extractor({
    name: 'kof2001',
    hi: false,
    nvram: 'saveram'
})
export default class Kof2001 extends Kof94 {
    protected recordSize = 12;
}
