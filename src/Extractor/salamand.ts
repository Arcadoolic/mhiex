import Lifefrce from "./lifefrce";
import Extractor from "../Decorator/Extractor";

// Same table as lifefrce. Checked against the game's BEST 10 PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'salamand'
})
export default class Salamand extends Lifefrce {
}
