import Hbarrel from "./hbarrel";
import Extractor from "../Decorator/Extractor";

// The top score (4 bytes), then the hbarrel layout: 10 scores (4 bytes, hex digits), 00 then 3 ASCII
// characters for each name. Checked against the game's BEST 10 PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'karnov'
})
export default class Karnov extends Hbarrel {
    protected scoresOffset = 4;
    protected namesOffset = 44;
}
