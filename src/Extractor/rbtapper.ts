import Tapper from "./tapper";
import Extractor from "../Decorator/Extractor";

// Same nvram table as tapper (hi2txt's definition).
@Extractor({
    name: 'rbtapper',
    hi: false,
    nvram: 'nvram'
})
export default class Rbtapper extends Tapper {
}
