import Jackal from "./jackal";
import Extractor from "../Decorator/Extractor";

// Same .hi layout as jackal. Scores checked against the game's BEST 5 screen (MAME 0.289); its default names are tile logos, how player initials are coded is not checked.
@Extractor({
    name: 'legion'
})
export default class Legion extends Jackal {}
