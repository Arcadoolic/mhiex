import Sf2 from "./sf2";
import Extractor from "../Decorator/Extractor";

// Same .hi layout as sf2. The default top score (POO 50000) matches the game's HUD (MAME 0.289).
@Extractor({
    name: 'ssf2'
})
export default class Ssf2 extends Sf2 {}
