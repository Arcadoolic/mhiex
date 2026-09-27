import Punchout from "./punchout";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (spnchoutj): the nvram keeps ranks 1-20 as punchout does, the .hi
// file ranks 21-50 (8-byte records, as punchout's). The 0.289 hiscore.dat entry's checks fail in
// attract mode, like punchout's: the nvram ranking is enough on its own. Checked against the game's HALL OF FAME screen (MAME 0.289): hi2txt misreads names from rank 4 (DNN for DNF).
@Extractor({
    name: 'spnchout',
    hi: 'optional',
    nvram: 'nvram'
})
export default class Spnchout extends Punchout {
    protected nvramRanks = 20;
    protected hiRanks = 30;
}
