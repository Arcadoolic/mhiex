import Terracre from "./terracre";
import Extractor from "../Decorator/Extractor";

// Same .hi layout as terracre. Checked against the game's BEST 5 screen (MAME 0.289).
@Extractor({
    name: 'magmax'
})
export default class Magmax extends Terracre {}
