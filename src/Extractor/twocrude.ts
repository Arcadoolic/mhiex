import Hbarrel from "./hbarrel";
import Extractor from "../Decorator/Extractor";

// hbarrel's table with the names (3 ASCII characters, then 00) right after the 10 scores. Checked against the game's BEST
// PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'twocrude'
})
export default class Twocrude extends Hbarrel {
    protected namesOffset = 39;
}
