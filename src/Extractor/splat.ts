import Blaster from "./blaster";
import Extractor from "../Decorator/Extractor";

// Same nvram layout as bubbles (hi2txt's definition). Checked with npm run compare.
@Extractor({
    name: 'splat',
    hi: false,
    nvram: 'nvram'
})
export default class Splat extends Blaster {
    protected scoreFactor = 1;
    protected tableOffset = 318;
    protected fullNameFirst = true;
    protected allTime = 41;
    protected daily = 6;
    protected dailyId = 'today';
    protected nameOffset = 54;
    protected charset = {0x0A: ' '};
}
