import Joust from "./joust";
import Extractor from "../Decorator/Extractor";

// Same nvram tables as joust, 6 bytes further (offsets from hi2txt's definition). Checked with npm run
// compare.
@Extractor({
    name: 'joust2',
    hi: false,
    nvram: 'nvram'
})
export default class Joust2 extends Joust {
    protected tableOffset = 324;
}
