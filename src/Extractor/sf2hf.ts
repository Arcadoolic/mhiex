import Sf2ce from "./sf2ce";
import Extractor from "../Decorator/Extractor";

// Same table as sf2ce (same hiscore.dat entry, other default names).
@Extractor({
    name: 'sf2hf'
})
export default class Sf2hf extends Sf2ce {
}
