import Kof94 from "./kof94";
import Extractor from "../Decorator/Extractor";

// Same saveram table as kof94. Checked with npm run compare.
@Extractor({
    name: 'kof95',
    hi: false,
    nvram: 'saveram'
})
export default class Kof95 extends Kof94 {
}
