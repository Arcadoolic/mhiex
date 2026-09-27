import {existsSync, readFileSync} from "fs";
import MHEBuffer from "./MHEBuffer";
import {join} from 'path';
import {ExtractorFiles, ExtractorOptionsData, ExtractorOptionsDataCharacters, Output} from "./interfaces";

export default abstract class AbstractExtractor {
    private gameName = '';
    private hasHi: boolean | 'optional' = false;
    private nvramName = '';

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
