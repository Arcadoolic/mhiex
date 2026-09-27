import Aburner from "./aburner";
import Extractor from "../Decorator/Extractor";

// Same .hi layout as aburner. Checked against the game's BEST FIGHTERS screen, hits included (MAME 0.289).
@Extractor({
    name: 'aburner2'
})
export default class Aburner2 extends Aburner {}
