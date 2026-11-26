export interface Output {
    default: Score[];
    extras?: {[id: string]: Score[]};
}

export interface Score {
    rank: number;
    score: number;
    name: string;
    scoreSuffix?: string;
    extra?: ScoreExtra;
}

export interface ScoreExtra {
    [key: string]: string|number;
}

export interface ExtractorFiles {
    // true: <rom>.hi is required; 'optional': read when it exists
    hi: boolean | 'optional';
    // nvram/<rom>/<file>, or null
    nvram: string | null;
}

export interface ExtractorOptions {
    name: string,
    // 'optional': read <rom>.hi when it exists (e.g. a hiscore.dat entry some romsets never pass)
    hi?: boolean | 'optional',
    nvram?: string;
    data?: ExtractorOptionsData;
    tables?: ModeTables;
}

// The tables that rank a game mode of their own, with the mode's name: 'default' and ids of
// `extras`. Extras not listed here are not leaderboards.
export interface ModeTables {
    [id: string]: string;
}

export interface ExtractorOptionsData {
    characters?: ExtractorOptionsDataCharacters;
}

export interface ExtractorOptionsDataCharacters {
    [key: number]: string;
}
