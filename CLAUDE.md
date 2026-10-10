# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A TypeScript library that decodes MAME hiscore plugin binary files (`.hi`, or nvram files) into JSON score lists. One extractor class per MAME ROM name; `MameHiExtractor` looks one up by ROM name and reads the data from a directory laid out like MAME's (`<dir>/hiscore/<rom>.hi`, `<dir>/nvram/<rom>/<file>`).

## Commands

```
npm install
npm run build                        # prebuild regenerates src/Extractor/index.ts, then tsc -> ./dist
npm test                             # jest (all tests)
./node_modules/.bin/jest raiden      # a single extractor's test (matches test/raiden.test.ts)
npm run compare -- <hi2txt-xml>/src/test [--hiscoredat <file>] [--rom <rom>] [--json <file>]
npm run dump-defaults -- [--rompath <dir>] [--out <dir>] (<rom>... | --missing-demo)
```

`npm run compare` (`compare-hi2txt.cjs`, reads `./dist`) runs every extractor on the hi2txt-xml test corpus (`input/<version>/{hi,nvram}`) and diffs the result with hi2txt's decoding (`oracle/<version>/<rom>.xml`). The corpus is GPLv2: keep it outside this repo and pass its path. hi2txt output is a reference, not ground truth (it decorates some names, e.g. `[NAME]`, and uses symbols like `★` where mhiex has a plain charset). Trailing rows scoring 0 are ignored on both sides (hi2txt often hides empty slots). When a game's own screen proves mhiex right and hi2txt wrong, add the rom to `CHECKED_ON_SCREEN` in the script with the evidence (a screenshot in `demo-hiscores/screenshots/`).

`npm run dump-defaults` (`tools/dump-defaults.cjs`, reads `./dist`) runs MAME with the `mhiexdump` plugin (`tools/mame-plugins/mhiexdump/`) to get a game's **default** hiscore file without playing: MAME's own hiscore plugin only writes a `.hi` once a default score is beaten. mhiexdump reads the same `hiscore.dat` entry, applies the same checks (fill at reset, start/end bytes, `@delay`), waits for the table to stay unchanged and writes it (3 emulated seconds, never before 15; when every check expects 00/00, which blank RAM passes too, it follows the table after the checks first pass and waits 30 seconds: starforc's table only appears after 20 s, and then fails its own 00 check). 1-byte ranges next to table ranges are markers: left out of the checks, written with their check value. MAME runs with `-noreadconfig` and throwaway cfg/nvram directories (the user's `~/.mame` is untouched); the nvram saved on exit is kept too. Output goes to `./dump-defaults/{hiscore,nvram}` (git-ignored), then each file is decoded with its extractor. Statuses: `ok`, `uniform` (only one byte value: check it is not uninitialized RAM), `timeout`, `missing-rom`, `no hiscore.dat entry (nvram game)`. A plugin needs MAME's own plugins directory in `-pluginspath` too (its `boot.lua` starts them): the script derives it from `hiscore.dat`.

**Tests import from `../dist`, not `src`.** You must run `npm run build` after changing anything in `src/` before running jest, otherwise tests run against stale code. CI does `build` then `test`.

## Architecture

- `src/index.ts` — `MameHiExtractor(dir)`: `exist(rom)` and `get(rom)` (instantiates the extractor and calls `init(dir)`, which reads the `.hi`/nvram file). Caller then calls `.extract().scores`.
- `src/AbstractExtractor.ts` — base class. Exposes `hi` / `nvram` (`MHEBuffer`), `output` (`{default: Score[], extras?: {[id]: Score[]}}`), and `scores`/`name`/`characters` getters. Subclasses implement `extract()`.
- `src/Decorator/Extractor.ts` — `@Extractor({name, hi?, nvram?, data?})` class decorator that sets the private `gameName`/`hasHi`/`nvramName`/`data` fields. `hi` defaults to true (`'optional'`: read `<rom>.hi` only when it exists); set `nvram: '<filename>'` for games storing scores in nvram (files under `demo-hiscores/nvram/<rom>/`). The decorator does not inherit: a subclass extractor (e.g. `mk2 extends Mk`) must repeat `hi`/`nvram`.
- `src/MHEBuffer.ts` — `Buffer` wrapper with chainable decoding helpers used by all extractors (BCD, base32/base40, byteSwap, byteSkip, nibbleSkip, byteMask, `toString(charset)`, …). Note that several helpers (`toString`, `reverse`, `byteSwap`, `byteFilter`, `trim*`, `byteMap`) **mutate the buffer in place**, while `slice`, `byteSkip`, `nibbleSkip`, `nibbleSwap` return new instances. In `toString(charset, offset)`, a charset entry gives its first character only (entries like `'&black-heart;'` produce `&`) and an empty entry `''` drops the byte; an unmapped byte becomes `byte + offset`, or U+FFFD past 0x7F. New decoding logic that is shared between games belongs here.
- `src/Extractor/<rom>.ts` — ~370 per-game extractors, each a `@Extractor`-decorated class slicing fixed offsets out of `this.hi` and pushing `Score`s (`rank`, `score`, `name`, optional `extra`). Alternate score tables (e.g. dual mode) go in `output.extras`.
- `src/Extractor/index.ts` — **generated** by `generate-extractors-dictionnary.cjs` (run automatically by `npm run build` via `prebuild`) from the filenames in `src/Extractor/`. Don't edit by hand. Class names are derived from the file name (capitalized first letter, or `Extractor` prefix if the name starts with a digit) and the file's default export is imported under that name.

## Adding an extractor

1. Add `src/Extractor/<rom>.ts` (copy a similar existing one; the file name must equal the MAME ROM name).
2. Put the sample hi file at `demo-hiscores/hiscore/<rom>.hi` (or nvram files) and the screenshot at `demo-hiscores/screenshots/<rom>.jpg` (`<rom>.part1.png`, etc. for multi-part).
3. Add `test/<rom>.test.ts` asserting the exact `scores` output against the screenshot, modeled on `test/raiden.test.ts`.
4. `npm run build && ./node_modules/.bin/jest <rom>`.
