import Extractor from "../Decorator/Extractor";
import {ScoreExtra} from "../interfaces";
import Truxton from "./truxton";

// Same table as truxton, with the area on 2 words, shown as "03-02" (second word first)
@Extractor({
    name: 'fireshrk'
})
export default class Fireshrk extends Truxton {
    protected extra(row: number): ScoreExtra {
        const part = (offset: number) => String(this.hi!.buffer.readUInt16BE(this.areas + row * 4 + offset)).padStart(2, '0');
        return {area: `${part(2)}-${part(0)}`};
    }
}
