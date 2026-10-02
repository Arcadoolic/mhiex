import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// A rom without an extractor: undefined, not "is not a constructor" (Arcadoolic/maui#100)
it('answers undefined for a rom without an extractor', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    expect(a.exist('puckman')).toBe(false)
    await expect(a.get('puckman')).resolves.toBeUndefined()
    expect(a.files('puckman')).toBeNull()
})
