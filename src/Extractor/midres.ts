import Hbarrel from "./hbarrel";
import Extractor from "../Decorator/Extractor";

// Same table as hbarrel without the unused 11th score: 10 scores (4 bytes, hex digits), then 10 names
// (00 then 3 ASCII characters). Checked against the game's BEST PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'midres'
})
export default class Midres extends Hbarrel {
    protected namesOffset = 40;
}
