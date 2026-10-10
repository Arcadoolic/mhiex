import Extractor from "../Decorator/Extractor";
import Puyo from "./puyo";

// Same table as puyo, with names in ASCII
@Extractor({
    name: 'puyopuy2'
})
export default class Puyopuy2 extends Puyo {
    protected nameOffset = 0;
}
