import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

// Layout from hi2txt's definition (167 bytes), checked with npm run compare.
@Extractor({
    name: 'astyanax'
})
export default class Astyanax extends AbstractExtractor {
    extract(): this {
        this.output.default.push(
            { rank: 1, score: parseInt(this.hi!.slice(0, 15).byteSkip(true).hexDigits('odd')), name: this.hi!.slice(17, 6).byteSkip(false).toString() },
            { rank: 2, score: parseInt(this.hi!.slice(31, 16).byteSkip(false).hexDigits('odd')), name: this.hi!.slice(49, 6).byteSkip(false).toString() },
            { rank: 3, score: parseInt(this.hi!.slice(63, 16).byteSkip(false).hexDigits('odd')), name: this.hi!.slice(81, 6).byteSkip(false).toString() },
            { rank: 4, score: parseInt(this.hi!.slice(95, 16).byteSkip(false).hexDigits('odd')), name: this.hi!.slice(113, 6).byteSkip(false).toString() },
            { rank: 5, score: parseInt(this.hi!.slice(127, 16).byteSkip(false).hexDigits('odd')), name: this.hi!.slice(145, 6).byteSkip(false).toString() },
        );
        return this;
    }
}
