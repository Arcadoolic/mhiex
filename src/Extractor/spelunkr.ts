import Spelunk2 from "./spelunk2";
import Extractor from "../Decorator/Extractor";

// Same table as spelunk2; ':' shows '.'. Checked against the game's BEST 10 PLAYERS screen (MAME 0.289).
@Extractor({
    name: 'spelunkr'
})
export default class Spelunkr extends Spelunk2 {
    protected charset = {0x3A: '.'};
}
