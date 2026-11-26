import AbstractExtractor from "./AbstractExtractor";
import {ExtractorFiles, ModeTables} from "./interfaces";

export type {ExtractorFiles, ModeTables} from "./interfaces";
import extractors from "./Extractor";


export class MameHiExtractor {
    constructor(private dir: string) {}

    /**
     * Return hiscores of a game; undefined when there is no extractor for it
     * @param romName
     */
    public async get(romName: string): Promise<AbstractExtractor | undefined | void> {
        const Extractor = extractors[romName]
        if (!Extractor) {
            return undefined
        }
        return (new Extractor()).init(this.dir)
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
     * The mode tables of a game, without reading its files; empty when it has one table only
     * @param romName
     */
    public tables(romName: string): ModeTables {
        return extractors[romName] ? (new extractors[romName]() as AbstractExtractor).tables : {}
    }

    /**
     * Check if hiscore extractor for a game exist
     * @param romName
     */
    public exist(romName: string): boolean {
        return extractors[romName] !== undefined
    }
}
