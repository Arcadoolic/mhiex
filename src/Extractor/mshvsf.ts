import Xmvsf from "./xmvsf";
import Extractor from "../Decorator/Extractor";

// Same .hi layout as xmvsf. Checked against the game's SCORE RANKING screen (MAME 0.289).
@Extractor({
    name: 'mshvsf'
})
export default class Mshvsf extends Xmvsf {}
