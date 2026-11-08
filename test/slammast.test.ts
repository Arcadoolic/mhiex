import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('slammast', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('slammast')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 987650, name: 'ZAQ', extra: { character: 5 } },
            { rank: 2, score: 95000, name: 'COM', extra: { character: 1 } },
            { rank: 3, score: 90000, name: 'C P', extra: { character: 2 } },
            { rank: 4, score: 85000, name: 'SYS', extra: { character: 3 } },
            { rank: 5, score: 80000, name: 'TEM', extra: { character: 4 } },
            { rank: 6, score: 75000, name: 'TOM', extra: { character: 5 } },
            { rank: 7, score: 70000, name: 'SDY', extra: { character: 6 } },
            { rank: 8, score: 65000, name: 'JOE', extra: { character: 7 } },
            { rank: 9, score: 60000, name: 'HMD', extra: { character: 0 } },
            { rank: 10, score: 55000, name: 'BIN', extra: { character: 1 } },
            { rank: 11, score: 50000, name: 'MIK', extra: { character: 2 } },
        ],
        extras: {
            teamBattleRoyal: [
                { rank: 1, score: 123450, name: 'XYZ', extra: { character: 9 } },
                { rank: 2, score: 95000, name: 'COM', extra: { character: 1 } },
                { rank: 3, score: 90000, name: 'C P', extra: { character: 2 } },
                { rank: 4, score: 85000, name: 'SYS', extra: { character: 3 } },
                { rank: 5, score: 80000, name: 'TEM', extra: { character: 4 } },
                { rank: 6, score: 75000, name: 'TOM', extra: { character: 5 } },
                { rank: 7, score: 70000, name: 'SDY', extra: { character: 6 } },
                { rank: 8, score: 65000, name: 'JOE', extra: { character: 7 } },
                { rank: 9, score: 60000, name: 'HMD', extra: { character: 8 } },
                { rank: 10, score: 55000, name: 'BIN', extra: { character: 9 } },
                { rank: 11, score: 50000, name: 'MIK', extra: { character: 0 } },
            ],
        },
    });
});
