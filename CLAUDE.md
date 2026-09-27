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
```

`npm run compare` (`compare-hi2txt.cjs`, reads `./dist`) runs every extractor on the hi2txt-xml test corpus (`input/<version>/{hi,nvram}`) and diffs the result with hi2txt's decoding (`oracle/<version>/<rom>.xml`). The corpus is GPLv2: keep it outside this repo and pass its path. hi2txt output is a reference, not ground truth (it decorates some names, e.g. `[NAME]`, and uses symbols like `★` where mhiex has a plain charset). Trailing rows scoring 0 are ignored on both sides (hi2txt often hides empty slots). When a game's own screen proves mhiex right and hi2txt wrong, add the rom to `CHECKED_ON_SCREEN` in the script with the evidence (a screenshot in `demo-hiscores/screenshots/`).

**Tests import from `../dist`, not `src`.** You must run `npm run build` after changing anything in `src/` before running jest, otherwise tests run against stale code. CI does `build` then `test`.

## Architecture

- `src/index.ts` — `MameHiExtractor(dir)`: `exist(rom)` and `get(rom)` (instantiates the extractor and calls `init(dir)`, which reads the `.hi`/nvram file). Caller then calls `.extract().scores`.
- `src/AbstractExtractor.ts` — base class. Exposes `hi` / `nvram` (`MHEBuffer`), `output` (`{default: Score[], extras?: {[id]: Score[]}}`), and `scores`/`name`/`characters` getters. Subclasses implement `extract()`.
- `src/Decorator/Extractor.ts` — `@Extractor({name, hi?, nvram?, data?})` class decorator that sets the private `gameName`/`hasHi`/`nvramName`/`data` fields. `hi` defaults to true; set `nvram: '<filename>'` for games storing scores in nvram (files under `demo-hiscores/nvram/<rom>/`).
- `src/MHEBuffer.ts` — `Buffer` wrapper with chainable decoding helpers used by all extractors (BCD, base32/base40, byteSwap, byteSkip, nibbleSkip, byteMask, `toString(charset)`, …). Note that several helpers (`toString`, `reverse`, `byteSwap`, `byteFilter`, `trim*`, `byteMap`) **mutate the buffer in place**, while `slice`, `byteSkip`, `nibbleSkip`, `nibbleSwap` return new instances. New decoding logic that is shared between games belongs here.
- `src/Extractor/<rom>.ts` — ~145 per-game extractors, each a `@Extractor`-decorated class slicing fixed offsets out of `this.hi` and pushing `Score`s (`rank`, `score`, `name`, optional `extra`). Alternate score tables (e.g. dual mode) go in `output.extras`.
- `src/Extractor/index.ts` — **generated** by `generate-extractors-dictionnary.cjs` (run automatically by `npm run build` via `prebuild`) from the filenames in `src/Extractor/`. Don't edit by hand. Class names are derived from the file name (capitalized first letter, or `Extractor` prefix if the name starts with a digit) and the file's default export is imported under that name.

## Adding an extractor

1. Add `src/Extractor/<rom>.ts` (copy a similar existing one; the file name must equal the MAME ROM name).
2. Put the sample hi file at `demo-hiscores/hiscore/<rom>.hi` (or nvram files) and the screenshot at `demo-hiscores/screenshots/<rom>.jpg` (`<rom>.part1.png`, etc. for multi-part).
3. Add `test/<rom>.test.ts` asserting the exact `scores` output against the screenshot, modeled on `test/raiden.test.ts`.
4. `npm run build && ./node_modules/.bin/jest <rom>`.
