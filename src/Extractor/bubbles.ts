import Blaster from "./blaster";
import Extractor from "../Decorator/Extractor";

// Blaster's Williams nvram layout (hi2txt's definition), full name before the name: 41 all-time ranks,
// 6 daily ones, A = 0x0B. Checked with npm run compare.
@Extractor({
    name: 'bubbles',
    hi: false,
    nvram: 'nvram'
})
export default class Bubbles extends Blaster {
    protected scoreFactor = 1;
    protected tableOffset = 318;
    protected fullNameFirst = true;
    protected allTime = 41;
    protected daily = 6;
    protected dailyId = 'today';
    protected nameOffset = 54;
    protected charset = {0x0A: ' '};
}
