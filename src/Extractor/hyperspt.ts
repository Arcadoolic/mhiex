import AbstractExtractor from "../AbstractExtractor";
import Extractor from "../Decorator/Extractor";

@Extractor({
    name: 'hyperspt',
    hi: false,
    nvram: 'nvram'
})
export default class Hyperspt extends AbstractExtractor {
    protected extraIds = [
        'tripleJump',
        'shooting',
        'pole',
        'freeStyle',
        'weight',
        'archery',
        'horse',
    ];

    extract(): this {
        let currentByte = 0; // Jump first 1024 Bytes

        this.output.extras = {};
        for (const extra of this.extraIds) {
            this.output.extras[extra] = [];
            for (let i = 0; i < 4; i++) { // All extras hiscores are by group of 4
                this.output.extras[extra].push({
                    rank: i + 1,
                    score: this.formatScore(this.nvram!.slice(currentByte,5).decodeBCD(), extra),
                    name: this.nvram!.slice(currentByte + 5, 3).toString({}, 48),
                    scoreSuffix: this.getScoreSuffix(extra)
                });
                currentByte += 8;
            }
        }
        currentByte += 6; // Skip a spacing (6B)
        // 23 records of 6 bytes: the 3 "HYPER MEDALIST" (title screen), then the "TODAYS BEST 10".
        // The last 10 records are never displayed by the game.
        this.output.extras.medalist = [];
        for (let i = 0; i < 13; i++) {
            const score = {
                rank: i < 3 ? i + 1 : i - 2,
                score: parseInt(this.nvram!.buffer.readUIntBE(currentByte, 3).toString(16)) * 10,
                name: this.nvram!.slice(currentByte + 3, 3).toString({}, 48)
            };
            (i < 3 ? this.output.extras.medalist : this.output.default).push(score);
            currentByte += 6;
        }
        return this;
    }

    protected formatScore(score: number, id: string) {
        if (['freeStyle', 'tripleJump', 'pole', 'freeStyle', 'horse'].indexOf(id) >= 0) {
            return score / 100;
        } else if (id === 'weight') {
            return score / 10;
        }
        return score;
    }

    protected getScoreSuffix(id: string) {
        if (id === 'freeStyle') {
            return 'sec';
        } else if (id === 'weight') {
            return 'kg'
        } else if (id === 'pole' || id === 'tripleJump') {
            return 'm'
        }
        return '';
    }
}
