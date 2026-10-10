import Extractor from "../Decorator/Extractor";
import {ScoreExtra} from "../interfaces";
import Truxton from "./truxton";

// Same table as truxton, but the game only fills and shows 5 of its 10 rows (TOP 5 PLAYERS),
// and the area is in 2 lists of 10 words, shown as "1-20"
@Extractor({
    name: 'hellfire'
})
export default class Hellfire extends Truxton {
    protected rows = 10;

    protected extra(row: number): ScoreExtra {
        const part = (list: number) => this.hi!.buffer.readUInt16BE(this.areas + list * 20 + row * 2);
        return {area: `${part(0)}-${part(1)}`};
    }

    extract(): this {
        super.extract();
        this.output.default = this.output.default.slice(0, 5);
        return this;
    }
}
