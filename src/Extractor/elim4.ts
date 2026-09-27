import Elim2 from "./elim2";
import Extractor from "../Decorator/Extractor";

// Same table as elim2, but the MAME 0.289 hiscore.dat entry saves the names (cc4d) before the scores
// (c928). Checked against the game's TOP TEN screen (MAME 0.289); its default scores are all 0.
@Extractor({
    name: 'elim4'
})
export default class Elim4 extends Elim2 {
    protected scoresFirst = false;
}
