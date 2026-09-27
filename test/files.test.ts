import { MameHiExtractor } from "../dist";

it('files() tells which files an extractor reads', () => {
    const a = new MameHiExtractor('')
    expect(a.files('dkong')).toEqual({ hi: true, nvram: null })
    expect(a.files('qbert')).toEqual({ hi: false, nvram: 'nvram/qbert/nvram' })
    expect(a.files('centiped')).toEqual({ hi: true, nvram: 'nvram/centiped/earom' })
    expect(a.files('punchout')).toEqual({ hi: 'optional', nvram: 'nvram/punchout/nvram' })
    expect(a.files('not-a-rom')).toBeNull()
})
