import Mk from "./mk";
import Extractor from "../Decorator/Extractor";

// Same nvram layout as mk (hi2txt: sameas mk). The decorator does not inherit: hi/nvram are repeated.
@Extractor({
    name: 'mk2',
    hi: false,
    nvram: 'nvram'
})
export default class Mk2 extends Mk {}
