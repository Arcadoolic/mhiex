import Outrun from "./outrun";
import Extractor from "../Decorator/Extractor";

// Same .hi layout as outrun. Checked against the game's BEST OUTRUNNERS screen (MAME 0.289).
@Extractor({
    name: 'toutrun'
})
export default class Toutrun extends Outrun {}
