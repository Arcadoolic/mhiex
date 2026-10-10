import { MameHiExtractor } from "../dist";
import { resolve } from "path";

// A rom without an extractor (a BIOS has no scores): undefined, not "is not a constructor" (Arcadoolic/maui#100)
it('answers undefined for a rom without an extractor', async () => {
    const a = new MameHiExtractor(resolve(__dirname, '../demo-hiscores'))
    expect(a.exist('neogeo')).toBe(false)
    await expect(a.get('neogeo')).resolves.toBeUndefined()
    expect(a.files('neogeo')).toBeNull()
})
