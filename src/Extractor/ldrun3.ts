import Ldrun4 from "./ldrun4";
import Extractor from "../Decorator/Extractor";

// Same .hi layout as ldrun4. Its default file is identical to ldrun2's.
@Extractor({
    name: 'ldrun3'
})
export default class Ldrun3 extends Ldrun4 {}
