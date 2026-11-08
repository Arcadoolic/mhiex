import { MameHiExtractor } from "../dist";
import { resolve } from "path";

it('wwfwfest', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    const extractor = await a.get('wwfwfest')
    expect(extractor?.extract().scores).toEqual({
        default: [
            { rank: 1, score: 9, name: 'TAK', extra: { stage: 9, wrestlers: 'HULK HOGAN & ULTIMATE WARRIOR' } },
            { rank: 2, score: 7, name: 'HAG', extra: { stage: 7, wrestlers: 'JAKE ROBERTS & BIG BOSS MAN' } },
            { rank: 3, score: 6, name: 'HAN', extra: { stage: 6, wrestlers: 'SGT. SLAUGHTER & MR. PERFECT' } },
            { rank: 4, score: 6, name: 'SIN', extra: { stage: 6, wrestlers: 'LEGION OF DOOM & LEGION OF DOOM' } },
            { rank: 5, score: 5, name: 'TAT', extra: { stage: 5, wrestlers: 'SMASH & CRUSH' } },
            { rank: 6, score: 5, name: 'KIN', extra: { stage: 5, wrestlers: 'HULK HOGAN & ULTIMATE WARRIOR' } },
            { rank: 7, score: 4, name: 'NAR', extra: { stage: 4, wrestlers: 'JAKE ROBERTS & BIG BOSS MAN' } },
            { rank: 8, score: 4, name: 'MAE', extra: { stage: 4, wrestlers: 'SGT. SLAUGHTER & MR. PERFECT' } },
            { rank: 9, score: 3, name: 'SAK', extra: { stage: 3, wrestlers: 'EARTHQUAKE & TED DIBIASE' } },
            { rank: 10, score: 3, name: 'ISI', extra: { stage: 3, wrestlers: 'JAKE ROBERTS & BIG BOSS MAN' } },
            { rank: 11, score: 2, name: 'TOM', extra: { stage: 2, wrestlers: 'HULK HOGAN & ULTIMATE WARRIOR' } },
        ],
        extras: {
            royalRumble: [
                { rank: 1, score: 9, name: 'TAK', extra: { beaten: 9, wrestler: 'HULK HOGAN' } },
                { rank: 2, score: 7, name: 'HAG', extra: { beaten: 7, wrestler: 'JAKE ROBERTS' } },
                { rank: 3, score: 6, name: 'HAN', extra: { beaten: 6, wrestler: 'SGT. SLAUGHTER' } },
                { rank: 4, score: 5, name: 'SIN', extra: { beaten: 5, wrestler: 'LEGION OF DOOM' } },
                { rank: 5, score: 4, name: 'TAT', extra: { beaten: 4, wrestler: 'LEGION OF DOOM' } },
                { rank: 6, score: 4, name: 'KIN', extra: { beaten: 4, wrestler: 'SMASH' } },
                { rank: 7, score: 3, name: 'NAR', extra: { beaten: 3, wrestler: 'CRUSH' } },
                { rank: 8, score: 3, name: 'MAE', extra: { beaten: 3, wrestler: 'SGT. SLAUGHTER' } },
                { rank: 9, score: 2, name: 'SAK', extra: { beaten: 2, wrestler: 'EARTHQUAKE' } },
                { rank: 10, score: 2, name: 'ISI', extra: { beaten: 2, wrestler: 'JAKE ROBERTS' } },
                { rank: 11, score: 1, name: 'TOM', extra: { beaten: 1, wrestler: 'HULK HOGAN' } },
            ],
        },
    });
});
