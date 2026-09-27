import AbstractExtractor from "./AbstractExtractor";
import {ExtractorFiles} from "./interfaces";

export type {ExtractorFiles} from "./interfaces";
import extractors from "./Extractor";


export class MameHiExtractor {
    constructor(private dir: string) {}

    /**
     * Return hiscores of a game
     * @param romName
     */
    public async get(romName: string): Promise<AbstractExtractor | undefined | void> {
        return (new extractors[romName]()).init(this.dir)
    }

    /**
     * Files the extractor of a game reads (its .hi, its nvram, or both), without reading them;
     * null when there is no extractor
     * @param romName
     */
    public files(romName: string): ExtractorFiles | null {
        return extractors[romName] ? (new extractors[romName]() as AbstractExtractor).files : null
    }

    /**
     * Check if hiscore extractor for a game exist
     * @param romName
     */
    public exist(romName: string): boolean {
        return extractors[romName] !== undefined
    }
}
