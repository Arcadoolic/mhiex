import Extractor from "../Decorator/Extractor";
import Zaxxon from "./zaxxon";

// Same table as zaxxon
@Extractor({
    name: 'congo'
})
export default class Congo extends Zaxxon {
}
