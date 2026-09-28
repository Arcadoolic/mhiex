import Blaster from "./blaster";
import Extractor from "../Decorator/Extractor";

// Blaster's Williams nvram layout (hi2txt's definition): 41 all-time ranks, 6 daily ones. Checked with
// npm run compare.
@Extractor({
    name: 'stargate',
    hi: false,
    nvram: 'nvram'
})
export default class Stargate extends Blaster {
    protected scoreFactor = 1;
    protected tableOffset = 312;
    protected allTime = 41;
    protected daily = 6;
    protected dailyId = 'mortals';
}
