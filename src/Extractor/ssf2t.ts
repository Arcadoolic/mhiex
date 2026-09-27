import Sf2 from "./sf2";
import Extractor from "../Decorator/Extractor";

// Same .hi layout as sf2. Its default file is identical to ssf2's.
@Extractor({
    name: 'ssf2t'
})
export default class Ssf2t extends Sf2 {}
