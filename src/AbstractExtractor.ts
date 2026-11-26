import {existsSync, readFileSync} from "fs";
import MHEBuffer from "./MHEBuffer";
import {join} from 'path';
import {ExtractorFiles, ExtractorOptionsData, ExtractorOptionsDataCharacters, ModeTables, Output} from "./interfaces";

export default abstract class AbstractExtractor {
    private gameName = '';
    private hasHi: boolean | 'optional' = false;
    private nvramName = '';
    private modeTables: ModeTables = {};

    protected hi?: MHEBuffer;
    protected nvram?: MHEBuffer;
    protected data?: ExtractorOptionsData;

    protected output: Output = {default: []};

    public init(filePath: string) {
        const hiPath = join(filePath, 'hiscore', this.gameName + '.hi');
        if (this.hasHi === true || (this.hasHi === 'optional' && existsSync(hiPath))) {
            this.hi = new MHEBuffer(readFileSync(hiPath));
        }
        if (this.nvramName) {
            this.nvram = new MHEBuffer(readFileSync(join(filePath, 'nvram', this.gameName, this.nvramName)))
        }
        return this;
    }

    abstract extract(withExtra?: boolean): this;

    public get scores(): Output {
        return this.output;
    }

    /** The tables ranking a game mode of their own; empty for a game with one table only */
    public get tables(): ModeTables {
        return this.modeTables;
    }

    /** Files the extractor reads, relative to the MAME directory */
    public get files(): ExtractorFiles {
        return {
            hi: this.hasHi,
            nvram: this.nvramName ? `nvram/${this.gameName}/${this.nvramName}` : null,
        };
    }

    public get name(): string {
        return this.gameName;
    }

    public get characters(): ExtractorOptionsDataCharacters|null {
        if (this.data && this.data.characters) {
            return this.data.characters;
        }
        return null;
    }
}
