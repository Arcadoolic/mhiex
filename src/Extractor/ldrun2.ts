import Ldrun4 from "./ldrun4";
import Extractor from "../Decorator/Extractor";

// Same .hi layout as ldrun4. Checked against the game's BEST 20 PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'ldrun2'
})
export default class Ldrun2 extends Ldrun4 {}
